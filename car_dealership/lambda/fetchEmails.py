import boto3
import json
from car_dealership.settings import SQSURL, AWS_REGION_NAME, SUBSCRIBERS_TABLE_NAME

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb', region_name=AWS_REGION_NAME)
    print("Triggered")
    table = dynamodb.Table(SUBSCRIBERS_TABLE_NAME)
    
    # Scan the DynamoDB table to get all emails
    try:
        response = table.scan()
        emails = [item['email'] for item in response.get('Items', [])]
        print(f"Fetched emails: {emails}")
    except Exception as e:
        print(f"Error scanning DynamoDB table: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps('Error scanning DynamoDB table')
        }
    
    sqs = boto3.client('sqs', region_name=AWS_REGION_NAME)
    queue_url = SQSURL
    
    # Send emails to SQS queue
    print("sending email")
    for email in emails:
        try:
            res = sqs.send_message(
                QueueUrl=queue_url,
                MessageBody=email
            )
            print(f"Sent email to SQS: {email}")
        except Exception as e:
            print(f"Error sending email to SQS: {e}")
    
    print("sent email")
    return {
        'statusCode': 200,
        'body': json.dumps('Emails sent to SQS queue!')
    }
