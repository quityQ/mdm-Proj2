# Playground to learn Deep Java Library (DJL)

image classification trained using https://paperswithcode.com/dataset/sports10

# How to Use
1. Prepare your data (Sports10 has 10k images, the dataset would train for hours)
2. Make sure that in your main folder are subfolder for each class you'd like to classify
3. Add your data to the project & set dataset parameter in Training.java
4. Run Traning.java; This should create a new model
5. Build an docker image and run it locally

Live model: bicicayb-mdmproj2-app.azurewebsites.net

There are some automated pipelines build in; if the project is pushed a new docker image will be created and pushed
The docker image is running on azure webapp. The webapp must be restarted for the latest image to be available
