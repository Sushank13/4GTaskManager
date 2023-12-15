import React, { useState } from 'react';
import axios from 'axios';
import {ChakraProvider,Container,Box,Heading,Text,Input,Button,VStack,FormControl,FormLabel,FormErrorMessage,Select} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
const AddTask = () => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    taskName: '',
    isUrgent: '',
    isImportant: '',
  });

  const [errors, setErrors] = useState({});
  const [newsletterEmail, setNewsletterEmail] = useState('');
 
  const handleNewsletterSubscribe = async () => {
    const errors = {};
  
    // Input validation check for email
    if (!newsletterEmail.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      errors.newsletterEmail = 'Invalid email address';
    }
  
    // If there are errors, show an alert and prevent the API call
    if (Object.keys(errors).length > 0) {
      alert('Invalid email address. Please provide a valid email.');
    } else {
      try {
        console.log("Backend base url:", process.env.REACT_APP_BACKEND_BASE_URL);
        var baseUrl=process.env.REACT_APP_BACKEND_BASE_URL;
        var api=baseUrl+'subscribeNewsletter';
        console.log(api);
        await axios.post(api, {
          email: newsletterEmail,
        });
        alert('You received an email to subscribe to the newsletter. Please confirm it.');
      } catch (error) {
        console.error('Error subscribing to the newsletter:', error);
        alert('Failed to subscribe to the newsletter. Please try again.');
      }
    }
  };
  

  const viewTasks = () => {
    navigate('/displayTasks');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
  
    // Input validation check for  email
    if (!formData.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      errors.email = 'Invalid email address';
    }
  
    // Input validation check for task name
    if (formData.taskName.trim() === '') {
      errors.taskName = 'Task name is required';
    }
  
    // Input Validattion check for urgency and importance
    if (formData.isUrgent.toLowerCase() !== 'yes' && formData.isUrgent.toLowerCase() !== 'no') {
      errors.isUrgent = 'Invalid input';
    }
  
    if (formData.isImportant.toLowerCase() !== 'yes' && formData.isImportant.toLowerCase() !== 'no') {
      errors.isImportant = 'Invalid input';
    }
  
    // If there are errors, update the state and prevent form submission
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
        try {
            const { email,taskName,isImportant,isUrgent} = formData;
            console.log("Backend base url:", process.env.REACT_APP_BACKEND_BASE_URL);
            var baseUrl=process.env.REACT_APP_BACKEND_BASE_URL;
            var api=baseUrl+'addTasks';
            console.log(api);
            const response = await axios.post(api, 
            {
              "user_email":email,
              "task_name":taskName,
              "urgent":isUrgent,
              "important":isImportant,
            });
             console.log('API Response:', response.data);
             if(response.status==200){
                alert('Task added successfully!');
                window.location.reload();
             }
             else{ 
                alert('Failed to add task. Please try again.');
            }
          } catch (error) {
            console.error('Error calling API:', error);
          }
    }
  };
  

  return (
    <ChakraProvider>
      <Container maxW="xl">
        <Box p={4}>
          <Heading mb={4}>About the Fourth Generation Task Manager</Heading>
          <Text mb={4}>
          The Fourth Generation (4G) Task Manager has been adapted from the concept of the 4 Quadrants time management tool introduced by Stephen R. Covey in his book "The 7 Habits of Highly Effective People." Covey's time management matrix is a framework that helps individuals prioritize tasks based on their urgency and importance. The tasks are categorized into four quadrants:
            <ol>
              <li><em>Urgent and Important (Quadrant I)</em>: Tasks in this quadrant are both urgent and important. They require immediate attention and often relate to critical issues or emergencies. These tasks need to be dealt with promptly.</li>
              <li><em>Not Urgent but Important (Quadrant II)</em>: Tasks in this quadrant are important but not urgent. These tasks contribute to long-term goals, personal development, and meaningful activities. It's essential to focus on Quadrant II tasks to prevent them from becoming urgent in the future.</li>
              <li><em>Urgent but Not Important (Quadrant III)</em>: Tasks in this quadrant are urgent but not important. They may seem pressing, but they don't contribute significantly to your long-term goals or priorities. Delegating or minimizing these tasks is often the best approach.</li>
              <li><em>Not Urgent and Not Important (Quadrant IV)</em>: Tasks in this quadrant are neither urgent nor important. They are time-wasting activities, distractions, or trivial matters that don't contribute to personal or professional growth. It's best to minimize or eliminate these tasks from your routine.</li>
            </ol>
            Covey's time management matrix encourages individuals to focus on Quadrant II activities, as they are crucial for personal and professional development. 
          </Text>
        </Box>
        <VStack spacing={4} align="flex-start">
          <Box w="50%">
            <Heading mb={4}>Add a Task</Heading>
            <FormControl isRequired isInvalid={errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>
            
            <FormControl isRequired isInvalid={errors.taskName}>
              <FormLabel>Task Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter task name"
                value={formData.taskName}
                onChange={(e) => setFormData({ ...formData, taskName: e.target.value })}
              />
              <FormErrorMessage>{errors.taskName}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={errors.isUrgent}>
              <FormLabel>Is the task urgent?</FormLabel>
              <Select
                placeholder="Select..."
                value={formData.isUrgent}
                onChange={(e) => setFormData({ ...formData, isUrgent: e.target.value })}>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
              </Select>
              <FormErrorMessage>{errors.isUrgent}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={errors.isImportant}>
              <FormLabel>Is the task important?</FormLabel>
              <Select
                placeholder="Select..."
                value={formData.isImportant}
                onChange={(e) => setFormData({ ...formData, isImportant: e.target.value })}>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
              </Select>
              <FormErrorMessage>{errors.isImportant}</FormErrorMessage>
            </FormControl>

            <Button mt={4} colorScheme="teal" onClick={handleSubmit}>
              Add Task
            </Button>
          </Box>
          <Box w="50%">
            <Button mt={4} colorScheme="blue" onClick={viewTasks}>
              View Tasks
            </Button>
            <FormControl mt={4} isRequired>
              <FormLabel>Enter your email address to subscribe to our newsletter</FormLabel>
              <VStack>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}/>
                <Button colorScheme="green" onClick={handleNewsletterSubscribe}>
                  Subscribe
                </Button>
              </VStack>
            </FormControl>
          </Box>
        </VStack>
      </Container>
    </ChakraProvider>
  );
};
export default AddTask;
