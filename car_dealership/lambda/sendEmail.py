import json
import boto3
from car_dealership.settings import AWS_REGION_NAME

def lambda_handler(event, context):
    ses = boto3.client('ses', region_name=AWS_REGION_NAME)
    
    for record in event['Records']:
        # Extract email from the SQS message
        email = record['body']
        
        # Send email via SES
        if email:
            ses.send_email(
                Source=email,
                Destination={
                    'ToAddresses': [email],
                },
                Message={
                    'Subject': {
                        'Data': 'New Car Added Notification',
                    },
                    'Body': {
                        'Text': {
                            'Data': 'A new car has been added to our listings. Check it out!',
                        },
                    }
                }
            )
    
    return {
        'statusCode': 200,
        'body': json.dumps('Emails sent successfully!')
    }
