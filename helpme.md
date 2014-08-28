How to encrpyt a .travis-yml file with your auth keys
-----------------------------------------------------
npm travis-encrypt
Install: npm install -g travis-encrypt 
Needs to have GitHub: <githublogin> -r <variable name>=<value>
Command: travis-encrypt kadowki/fb -r FROM=18005555555 TWTOK=123 TWSID=1123