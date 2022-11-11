# web-mta
#Git clone: Git clone is a command for downloading existing source code from a remote repository (like Github, for example).
git clone <https://name-of-the-repository-link>
#Git branch: 
Creating a new branch:
  git branch <branch-name>
 To push the new branch into the remote repository, you need to use the following command:
  git push -u <remote> <branch-name>
 Viewing branches:
  git branch or git branch --list
 Deleting a branch:
  git branch -d <branch-name>
#Git add:
  When we create, modify or delete a file, these changes will happen in our local and won't be included in the next commit (unless we change the configurations).
  We need to use the git add command to include the changes of a file(s) into our next commit. 
 To add a single file:
  git add <file>
 To add everything at once:
  git add -A
#Git commit:
  git commit -m "commit message"
#Git push:
  git push <remote> <branch-name>
  git push --set-upstream <remote> <name-of-your-branch>
 OR
  git push -u origin <branch_name>
  
