# slack-feedback

At the moment, this is just an API, with the following commands:

## User management:

*Create a user*

Command:

    curl -v -XPOST "http://localhost:3001/api/v1/users/create" \
      -H "Content-Type: application/json" \
      -d '{"username": "phil", "password": "password"}'
      
Expected response:

      {"create_user":"successful","userid":20,"username":"phil20","token":"4d8e2b5ebf5345490872511d4e53f87fc4e8edb32d0c95565553d79c1fa1c4dd"}
      
*Log-in as a user*

Command:

    curl -v -XPOST "http://localhost:3001/api/v1/users/log_in" \
      -H "Content-Type: application/json" \
      -d '{"username": "phil", "password": "password"}'

Expected response:

    {"login":"successful","userid":5,"username":"phil","token":"9985688ceeabe46dd5bc50eba294fa1fd03b0cf335a3f55f80b37bc7e6f51019"}
    
    
In both cases, the response contains a userid, and a token. These are used to authenticate requests in the feedback API.

## Feedback API:

*Add feedback*

Command:

    curl -v -XPOST "http://localhost:3001/api/v1/feedback/5?token=9985688ceeabe46dd5bc50eba294fa1fd03b0cf335a3f55f80b37bc7e6f51019" \
      -H "Content-Type: application/json" \
      -d '{"text": "things are good!"}'
      
*Get all previous feedback*

Command:

    curl -v -XGET "http://localhost:3001/api/v1/feedback/5?token=9985688ceeabe46dd5bc50eba294fa1fd03b0cf335a3f55f80b37bc7e6f51019" \
      -H "Content-Type: application/json"
    
Expected Response:

    [{"user_id":5,"feedback":"things are good!"}]
