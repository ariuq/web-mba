# web-mta
## Git clone: 
Git clone is a command for downloading existing source code from a remote repository (like Github, for example). <br />
####  git clone <https://name-of-the-repository-link>
## Git branch: 
Creating a new branch: <br />
  #### git branch <branch-name> <br />
 To push the new branch into the remote repository, you need to use the following command: <br />
  #### git push -u <remote> <branch-name> <br />
 Viewing branches: <br />
  #### git branch or git branch --list <br />
 Deleting a branch: <br />
  #### git branch -d <branch-name> <br />
## Git add:
  When we create, modify or delete a file, these changes will happen in our local and won't be included in the next commit (unless we change the configurations).
  We need to use the git add command to include the changes of a file(s) into our next commit. <br /> 
 To add a single file: <br />
  #### git add <file> <br />
 To add everything at once: <br />
  #### git add -A <br />
## Git commit: <br />
  #### git commit -m "commit message" <br />
## Git push: <br />
  #### git push <remote> <branch-name> <br />
  #### git push --set-upstream <remote> <name-of-your-branch> <br />
 OR <br />
  <br />
  #### git push -u origin <branch_name>
  
