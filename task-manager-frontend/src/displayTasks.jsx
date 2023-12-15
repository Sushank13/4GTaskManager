import React, { useState } from 'react';
import {ChakraProvider,Container,Box,Heading,Input,Button,FormControl,FormLabel,HStack,SimpleGrid} from '@chakra-ui/react';
import Quadrant from './quadrant';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DisplayTasks = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [tasks, setTasks] = useState({
    urgentAndImportant: [],
    notUrgentButImportant: [],
    urgentButNotImportant: [],
    notUrgentAndNotImportant: [],
  });
  
  const handleSubmit = async () =>  {
    const errors = {};
    
    // Input validation check for email
    if (!email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      errors.email = 'Invalid email address';
    }
    if (Object.keys(errors).length > 0) {
      alert('Invalid email address. Please provide a valid email.');
      } 
    else {
        try {
              localStorage.setItem("user_email",email);  
              console.log("Backend base url:", process.env.REACT_APP_BACKEND_BASE_URL); 
              var baseUrl=process.env.REACT_APP_BACKEND_BASE_URL;
              var api1=baseUrl+'getUAndITasks';
              var api2=baseUrl+'getIButNotUTasks';
              var api3=baseUrl+'getUButNotITasks';
              var api4=baseUrl+'getNeitherUAndITasks';         
              const [response1, response2, response3, response4] = await Promise.all([
              axios.post(api1, { email: email }),
              axios.post(api2, { email: email }),
              axios.post(api3, { email: email }),
              axios.post(api4, { email: email }),
            ]);
            console.log("response1",response1.data);
            console.log("response2",response2.data);
            console.log("response3",response3.data);
            console.log("response4",response4.data);
            if(response1.data==""&&response2.data==""&&response3.data==""&&response4.data=="")
            {
              alert("No tasks found for the user: "+ email+". Please add your tasks.");
            }

            setTasks({
                urgentAndImportant:response1.data,
                notUrgentButImportant:response2.data,
                urgentButNotImportant:response3.data,
                notUrgentAndNotImportant:response4.data
              });
          } catch (error) {
            console.error('Error calling Lambdas:', error);
            alert("Could not fetch your tasks.Please try again.")
          }
        
      }
  };

  const handleRefresh = () => {
    window.location.reload(); // Reload the whole page
    localStorage.removeItem('user_email') //remove user_email from local storage
  };

  const onDeleteTask = async (task, index) => {
    const userEmail = localStorage.getItem('user_email');
    try {
      // Make API call to delete task using user_email and task_name
      var baseUrl=process.env.REACT_APP_BACKEND_BASE_URL;
      var api=baseUrl+'deleteTask';
      const response = await axios.post(api, {
        email: userEmail,
        task_name: task,
      });
      setTasks((prevTasks) => {
        return {
          urgentAndImportant: prevTasks.urgentAndImportant.filter((t) => t !== task),
          notUrgentButImportant: prevTasks.notUrgentButImportant.filter((t) => t !== task),
          urgentButNotImportant: prevTasks.urgentButNotImportant.filter((t) => t !== task),
          notUrgentAndNotImportant: prevTasks.notUrgentAndNotImportant.filter((t) => t !== task),
        };
      });
      console.log('Task deleted successfully:', response.data);
      alert("Task deleted successfully")
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task. Please try again.');
    }
  };

  return (
    <ChakraProvider>
      <Container maxW="xl">
        <Box p={4}>
          <Heading mb={4}>Your Tasks</Heading>
          <HStack mb={4}>
          <Button colorScheme="teal" onClick={() => navigate('/')}>Back</Button>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <Button colorScheme="teal" onClick={handleSubmit}>
              Submit
            </Button>
            <Button colorScheme="teal" onClick={handleRefresh}>
              Change User
            </Button>
          </HStack>
          <SimpleGrid columns={2} spacing={4}>
            <Quadrant title="Urgent and Important" tasks={tasks.urgentAndImportant} onDeleteTask={onDeleteTask}  />
            <Quadrant title="Not Urgent but Important" tasks={tasks.notUrgentButImportant} onDeleteTask={onDeleteTask}  />
            <Quadrant title="Urgent but Not Important" tasks={tasks.urgentButNotImportant} onDeleteTask={onDeleteTask} />
            <Quadrant title="Not Urgent and Not Important" tasks={tasks.notUrgentAndNotImportant} onDeleteTask={onDeleteTask}  />
          </SimpleGrid>
        </Box>
      </Container>
    </ChakraProvider>
  );
};

export default DisplayTasks;
