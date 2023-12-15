import React from 'react';
import { Box, Heading, VStack,Button,Flex,Text } from '@chakra-ui/react';

const Quadrant = ({ title, tasks,onDeleteTask }) => {
  return (
    <Box borderWidth="1px" borderRadius="md" p={4} h="300px" overflowY="auto">
      <Heading mb={2} fontSize="lg">
        {title}
      </Heading>
      <VStack spacing={2} align="start">
        {tasks.map((task, index) => (
          <Box key={index}>
          <Flex justifyContent="space-between" alignItems="center" w="100%">
            <Text>{task}</Text>
            <Button colorScheme="red" size="xs" onClick={() => onDeleteTask(task,index)}>
              Delete
            </Button>
          </Flex>
        </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Quadrant;
