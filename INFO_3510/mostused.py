import requests


def get_access_token(url, client_id, client_secret):
    url = url
    data = {
        'client_id': client_id,
        'client_secret': client_secret,
        'grant_type': 'client_credentials'
    }
    response = requests.post(url, data=data)
    response_data = response.json()
    if response.status_code != 200:
        print('Error:', response_data['error'])
        return None
    else:
        print('Access Token:', response_data['access_token'])
        return response_data['access_token']
    