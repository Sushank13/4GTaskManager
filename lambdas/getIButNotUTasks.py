import json
import boto3

# Initializing DynamoDB client
print("Initializing DynamoDB client")
dynamodb = boto3.client('dynamodb')
table_name = 'task_details' 

def lambda_handler(event, context):
    # Parsing input data from the Lambda event
    print("Parsing input data from the Lambda event")
    email=event["email"]
    print("Fetching data from DynamoDB")
    try:
        response=dynamodb.query(
            TableName=table_name,
            ProjectionExpression='task_name', 
            FilterExpression='important = :important AND urgent = :urgent',
            KeyConditionExpression='user_email= :email',
            ExpressionAttributeValues={
                ':email': {'S': email},
                ':important': {'BOOL': True},
                ':urgent': {'BOOL': False}
            }
            
        )
        items =[]
        for item in response['Items']:
            task_name = item['task_name']['S']
            items.append(task_name)
        return items

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error: {str(e)}')
        }
        