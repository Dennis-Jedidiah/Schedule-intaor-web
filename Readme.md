# Unnamed schedule project

## An Ontario Tech based time blocking tool.

I'm not quite sure what to write here yet but this is going to be my schedule project thing.

- using Concurrently to manage the monorepo
- instead of using CORS to connect the two parts of the app, I'll just build the react app everytime and connect them normally.
- I've decided to Use "gpt-4o-mini" as it is a pretty cheap model with text/image -> text capabilities.
- so right now, I have the project at a point where it accepts screenshots and recognizes most of what is going on.
    it can understand and extract basically everything that it sees. but the course start and end dates are not on the student schedule so those will have to be explicitly supplied by the user.

- right now, the screenshots are stored in the memory buffer and converted to Base64 and sent straight to the LLM from there. 
- the LLM gives back JSON data that will later be converted to .ics files.
- so far, the project is in a workable form. I do not know how much each calendar costs, but I will find out and set the app pricing accordingly.
- I will also clean up this repository and make it available for use.
