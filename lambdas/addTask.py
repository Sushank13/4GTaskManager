import json
import boto3

# Initializing DynamoDB client
print("Initializing DynamoDB client")
dynamodb = boto3.client('dynamodb')
table_name = 'task_details' 

def lambda_handler(event, context):
    # Parsing input data from the Lambda event
    print("Parsing input data from the Lambda event")
    task_name = event['task_name']
    urgent = event['urgent']
    important = event['important']
    user_email = event['user_email']

    # Storing data in DynamoDB
    print("Storing data in DynamoDB")
    try:
        if(urgent.lower()=="yes"):
            urgent=True
        else:
            urgent=False
        if(important.lower()=="yes"):
            important=True
        else:
            important=False
        db_response = dynamodb.put_item(
            TableName=table_name,
            Item={
                'task_name': {'S': task_name.lower()},
                'urgent': {'BOOL': urgent},
                'important': {'BOOL': important},
                'user_email': {'S': user_email}
            }
        )
        if(db_response is not None):
            print("Task added successfully")
            #call notification lambda and pass all details here.
            return {
            'statusCode': 200,
            'body': json.dumps('Task details stored successfully in DynamoDB.')
            }
    except Exception as e:
        print("Error in adding the task")
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error: {str(e)}')
        }
