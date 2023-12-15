import json
import os
import boto3

def lambda_handler(event, context):
    endpoint = event["email"]

    try:
        print("Initializing the SNS client")

        # Retrieve SNS topic ARN from environment variable
        sns_topic_arn = os.environ['SNS_TOPIC_ARN']

        sns = boto3.client('sns', region_name='us-east-1')
        response = sns.subscribe(
            TopicArn=sns_topic_arn,
            Protocol='email',
            Endpoint=endpoint
        )

        if response["SubscriptionArn"] is not None:
            return {
                'statusCode': 200,
                'body': json.dumps('User subscription email sent successfully!')
            }
    except Exception as e:
        print("Error in subscribing the user")
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error: {str(e)}')
        }
