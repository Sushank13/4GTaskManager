import boto3
import json

def lambda_handler(event, context):
    # Extracting user email and task name from the event
    print("Extracting user email and task name from the event")
    email = event["email"]
    task_name = event["task_name"]
    
    dynamodb_table_name = "task_details"
    dynamodb = boto3.client("dynamodb")
    
    try:
        # Deleting the record from DynamoDB table
        print("Deleting the record from DynamoDB table")
        dynamodb.delete_item(
            TableName=dynamodb_table_name,
            Key={
                "user_semail": {"S": email},
                "task_name": {"S": task_name}
            }
        )
        print("record deleted successfully")
        response = {
            "statusCode": 200,
            "body": json.dumps("Record deleted successfully.")
        }
    except Exception as e:
        print("failed to delete the record")
        response = {
            "statusCode": 500,
            "body": json.dumps(f"Error: {str(e)}")
        }
    
    return response
