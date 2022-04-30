import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';
import axios from "axios";
import {useDispatch} from "react-redux";
import {renewEnrolledCourse} from "../dashboardSlice";
import FormControl from "@mui/material/FormControl";
import {Checkbox, Input, InputLabel, ListItemText, Select} from "@mui/material";
import {DesktopTimePicker} from "@mui/x-date-pickers";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';


const departments = [
    {value: 'Empty', label: ''},
    {value: 'computer science', label: 'Computer Science',},
    {value: 'Engineering', label: 'Engineering',},
    {value: 'Mathematics', label: 'Mathematics',},
];

const offeredTimes = [
    {value: 'Empty', label: ''},
    {value: '2022 spring', label: '2022 Spring',},
    {value: '2022 summer', label: '2022 Summer',},
    {value: '2022 fall', label: '2022 Fall',},
    {value: '2022 winter', label: '2022 Winter',},
];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
const Weekdays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
];

export default function CreateCourse({server}) {

    const dispatch = useDispatch();
    let email = localStorage.getItem('myEmail')
    let password = localStorage.getItem('myPassword')
    let type = localStorage.getItem('myType')
    // let email = useSelector(state => state.contentsController.email)
    // let password = useSelector(state => state.contentsController.password)
    // let type = useSelector(state => state.contentsController.type)

    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: {value},
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const createCourseForm = new FormData(event.currentTarget);

        console.log("handle create course button");

        let createCourse = JSON.stringify({
            "email": email,
            "password": password,
            "type": type,
            "code": createCourseForm.get("course id"),
            "title": createCourseForm.get("course name"),
            "seat": createCourseForm.get("availability"),
            "unit": createCourseForm.get("units"),
            "location": createCourseForm.get("location"),
            "startTime": startTime,
            "endTime": endTime,
            "department": createCourseForm.get("department"),
            "semester": createCourseForm.get("offered time"),
            "information": createCourseForm.get("description"),
            "weekday": createCourseForm.get("weekday"),
        })

        console.log(createCourse);
        axios.post(server+'/create-course',
            createCourse,
            {headers: {'Content-Type': 'application/json'}})
            .then(function(response) {
                if(response.data.code === 1000){
                    console.log("Add course successfully!");
                    let user = JSON.stringify({
                        "email": email,
                        "password": password,
                        "type": type,
                    })
                    axios.post(server+'/get-enrolled-courses',
                        user,
                        {headers: {'Content-Type': 'application/json'}})
                        .then(function(response) {
                            if(response.data.code === 1000){
                                dispatch(renewEnrolledCourse(response.data.data))
                            } else {
                                console.log(response.data.message);
                            }
                        });
                } else {
                    console.log(response.data.message);
                }
            });
    };

    const [department, setDepartment] = React.useState('');
    const [offeredTime, setOfferedTime] = React.useState('');
    const [startTime, setStartTime] = React.useState(new Date());
    const [endTime, setEndTime] = React.useState(new Date());


    const handleDepartmentChange = (event) => {
        setDepartment(event.target.value);
    }
    const handleOfferedTimeChange = (event) => {
        setOfferedTime(event.target.value);
    }

    return (
      <Paper sx={{maxWidth: 936, margin: 'auto', overflow: 'hidden'}}>
          <Box
              component="form"
              sx={{
                  '& .MuiTextField-root': {m: 1, ml: 4, mt: 2, width: '25ch'},
              }}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
          >
              <Grid container>
                  <Grid item xs={12}>
                      <TextField
                          id="standard-textarea"
                          label="Course Name"
                          name="course name"
                          placeholder="Placeholder"
                          variant="standard"
                          sx={{m: 2}}
                      />
                      <TextField
                          id="standard-textarea"
                          label="Course ID"
                          name="course id"
                          placeholder="Placeholder"
                          variant="standard"
                          sx={{m: 2}}
                      />
                      <TextField
                          id="standard-textarea"
                          label="Availability"
                          name="availability"
                          placeholder="Placeholder"
                          variant="standard"
                          sx={{m: 2}}
                      />
                  </Grid>
                  <Grid item>
                      <TextField
                          id="standard-textarea"
                          label="Units"
                          name="units"
                          placeholder="Placeholder"
                          variant="standard"
                          sx={{m: 2}}
                      />
                      <TextField
                          id="standard-textarea"
                          label="Location"
                          name="location"
                          placeholder="Placeholder"
                          variant="standard"
                          sx={{m: 2}}
                      />
                  </Grid>
                  <Grid item>
                      <TextField
                          id="standard-select-currency"
                          select
                          label="Department"
                          name="department"
                          value={department}
                          onChange={handleDepartmentChange}
                          helperText="Please select your department"
                          variant="standard"
                          sx={{m: 2}}
                      >
                          {departments.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                              </MenuItem>
                          ))}
                      </TextField>
                      <TextField
                          id="standard-select-currency"
                          select
                          label="Offered Time"
                          name="offered time"
                          value={offeredTime}
                          onChange={handleOfferedTimeChange}
                          helperText="Please select your offered time"
                          variant="standard"
                          sx={{m: 2}}
                      >
                          {offeredTimes.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                              </MenuItem>
                          ))}
                      </TextField>
                  </Grid>
                  <Grid item>
                      <FormControl variant="standard" sx={{ml: 4, mt:2, minWidth: 225}}>
                          <InputLabel id="demo-simple-select-standard-label">Weekday</InputLabel>
                          <Select
                              labelId="demo-multiple-checkbox-label"
                              id="demo-multiple-checkbox"
                              name="weekday"
                              multiple={true}
                              value={personName}
                              onChange={handleChange}
                              label="Weekday"
                              input={<Input label="Tag"/>}
                              renderValue={(selected) => selected.join(', ')}
                              MenuProps={MenuProps}

                              sx={{minWidth: 150}}
                          >
                              {Weekdays.map((name) => (
                                  <MenuItem key={name} value={name}>
                                      <Checkbox checked={personName.indexOf(name) > -1}/>
                                      <ListItemText primary={name}/>
                                  </MenuItem>
                              ))}
                          </Select>
                      </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DesktopTimePicker
                              label="Start time"
                              name="start time"
                              value={startTime}
                              onChange={(newValue) => {
                                  setStartTime(newValue);
                              }}
                              renderInput={(params) => <TextField {...params} />}
                          />
                      </LocalizationProvider>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DesktopTimePicker
                              label="End time"
                              name="end time"
                              value={endTime}
                              onChange={(newValue) => {
                                  setEndTime(newValue);
                              }}
                              renderInput={(params) => <TextField {...params} />}
                          />
                      </LocalizationProvider>
                  </Grid>
                  <Grid item>
                      <TextField
                          id="standard-multiline-static"
                          label="Description"
                          name="description"
                          multiline
                          rows={4}
                          variant="standard"
                          sx={{m: 2}}
                      />
                  </Grid>
              </Grid>
              <Toolbar>
                  <Grid item>
                      <Button type="submit"
                              variant="contained"
                              sx={{m: 2}}
                              placement="right-start">
                          Create Course
                      </Button>
                  </Grid>
              </Toolbar>
        </Box>
      </Paper>
    );
}