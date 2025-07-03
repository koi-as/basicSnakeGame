# A Basic Snake Game
### By Alex Seidensticker

I followed a tutorial by [Code With Adam](https://youtu.be/7Azlj0f9vas) on how to create a snake game using JavaScript. 

It was fairly simple, but I wanted to add some extra features.

## My Additions

I added a simple highscore feature that saves your highest score to `localStorage` and displays that under the score in the upper right hand portion of the canvas. This score continues to update as you get higher and higher scores during gameplay.

The other feature I wanted to add was a reset function that allowed me to play again without erasing the localStorage highscore. To do this, I created a button with a function that reset all related variable back to default setting and re-initiated the gameplay loop. 

This took a while because I kept finding bugs such as speed persisted between games, snake length wouldn't reset, among other things. Now it should be working perfectly fine, my basic little snake game which you can play here: https://koi-as.github.io/basicSnakeGame/

Have fun :)
