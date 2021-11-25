# radium
Repository for backend cohort - Radium


# step 1
install mongoose : npm i mongoose (from parent folder)


# step 2
use MOdel to interact with DB


#step 3
break your code into correct folder structure 







# Notes:
Token- A token is an Object that can be used to authenticate a user to server.
       In the token information is not human readable form.
       ex.everytime we login on fb the token is created new.
       It divide into 3 parts: 1).Header 2).payload 3)verifiy signature

 Steps to follow

1.install- npm i jsonwebtoken
2.import using-const jwt=require('jsonwebtoken')
3.for encoding token we use
  -jwt.sign (ex. let token=jwt.sign(payload,'mysecretkey')
when we use this it gives token in response header ,and use this token when you verify/decode the toden in requst header.

4.for verifying/decoding the token we use
  -jwt.verify (ex. let validtoken=jwt.verify(token,'mysecretekey')

*when we encode and decode token must provide same secrete key name.
*this secrete is save in database.