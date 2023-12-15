import json
import boto3
import os

def lambda_handler(event, context):
    try:
        # Initializing the SNS client
        print("Initializing the SNS client")
        sns = boto3.client('sns', region_name='us-east-1')  
        # Retrieve SNS topic ARN from environment variable
        sns_topic_arn = os.environ['SNS_TOPIC_ARN']   
        message = message = """Just a reminder on how to use the 4G Task Manager.\n
        The 4G Task Manager has been adapted from the concept of the 4 Quadrants time management tool introduced by Stephen R. Covey in his book "The 7 Habits of Highly Effective People." Covey's time management matrix is a framework that helps individuals prioritize tasks based on their urgency and importance. The tasks are categorized into four quadrants:\n
        - **Urgent and Important (Quadrant I):**\n
        Tasks in this quadrant are both urgent and important. They require immediate attention and often relate to critical issues or emergencies. These tasks need to be dealt with promptly.\n
        - **Not Urgent but Important (Quadrant II):**\n
        Tasks in this quadrant are important but not urgent. These tasks contribute to long-term goals, personal development, and meaningful activities. It's essential to focus on Quadrant II tasks to prevent them from becoming urgent in the future.\n
        - **Urgent but Not Important (Quadrant III):**\n
        Tasks in this quadrant are urgent but not important. They may seem pressing, but they don't contribute significantly to your long-term goals or priorities. Delegating or minimizing these tasks is often the best approach.\n
        - **Not Urgent and Not Important (Quadrant IV):**\n
        Tasks in this quadrant are neither urgent nor important. They are time-wasting activities, distractions, or trivial matters that don't contribute to personal or professional growth. It's best to minimize or eliminate these tasks from your routine.\n
        Covey's time management matrix encourages individuals to focus on Quadrant II activities, as they are crucial for personal and professional development."""
        subject = 'Newsletter from the 4G Task Manager' 
        # Publishing the message to the specific email address
        print("Publishing the message to the subscribers")
        response = sns.publish(
        TargetArn=sns_topic_arn,
        Message=message,
        Subject=subject)
        if response["MessageId"] is not None:
            return {
        'statusCode': 200,
        'body': json.dumps('Newsletter published successfully!')
        }
    except Exception as e:
        print("Error in publishing the Newsletter")
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error: {str(e)}')
        }

