#How to encrpyt a .travis-yml file with your auth keys

###npm travis-encrypt
- Install: npm install -g travis-encrypt 
- GitHub Format: <githublogin> -r <variable name>=<value>
- Example Command: travis-encrypt kadowki/fb -r FROM=18005555555 TWTOK=123 TWSID=1122

##This will return encrypted keys that need to be added to .travis.yml
##See the .travis.yml file in this project to see an example 

Adding .keys and .key-test
--------------------------
##.bashrc format:  source  ~/.keys
## Will need to use this format to reload the .keys-test 