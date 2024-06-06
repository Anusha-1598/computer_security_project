from flask import Blueprint, redirect, url_for, session, request, jsonify
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import Flow
from googleapiclient.discovery import build
import os
import requests

google_docs_bp = Blueprint('google_docs_bp', __name__)

CLIENT_SECRETS_FILE = os.getenv('GOOGLE_CLIENT_SECRETS_FILE', 'credentials.json')
SCOPES = ['https://www.googleapis.com/auth/documents', 'https://www.googleapis.com/auth/drive.file']

@google_docs_bp.route('/authorize')
def authorize():
    flow = Flow.from_client_secrets_file(
        CLIENT_SECRETS_FILE,
        scopes=SCOPES,
        redirect_uri=url_for('google_docs_bp.oauth2callback', _external=True)
    )
    authorization_url, state = flow.authorization_url(access_type='offline', include_granted_scopes='true')
    session['state'] = state
    return redirect(authorization_url)

@google_docs_bp.route('/oauth2callback')
def oauth2callback():
    state = session['state']
    flow = Flow.from_client_secrets_file(
        CLIENT_SECRETS_FILE,
        scopes=SCOPES,
        state=state,
        redirect_uri=url_for('google_docs_bp.oauth2callback', _external=True)
    )
    authorization_response = request.url
    flow.fetch_token(authorization_response=authorization_response)
    credentials = flow.credentials
    session['credentials'] = credentials_to_dict(credentials)
    return redirect(url_for('google_docs_bp.index'))

@google_docs_bp.route('/')
def index():
    if 'credentials' not in session:
        return redirect(url_for('google_docs_bp.authorize'))
    credentials = Credentials(**session['credentials'])
    docs_service = build('docs', 'v1', credentials=credentials)

    title = 'My Document'
    body = {'title': title}
    doc = docs_service.documents().create(body=body).execute()
    document_id = doc['documentId']

    session['credentials'] = credentials_to_dict(credentials)
    return f'Document created: <a href="https://docs.google.com/document/d/{document_id}">Open Document</a>'

def credentials_to_dict(credentials):
    return {
        'token': credentials.token,
        'refresh_token': credentials.refresh_token,
        'token_uri': credentials.token_uri,
        'client_id': credentials.client_id,
        'client_secret': credentials.client_secret,
        'scopes': credentials.scopes
    }
