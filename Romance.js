/*

Romance.js (now with 100% more Bernie!)

*/ 

// Choose some text to analyze

var text = "Democratic socialism means that, in the year 2015, a college degree is equivalent to what a high school degree was 50 years ago—and that public education must allow every person in this country, who has the ability, the qualifications and the desire, the right to go to a public colleges or university tuition free. This is also not a radical idea. It exists today in many countries around the world. In fact, it used to exist in the United States. Democratic socialism means that our government does everything it can to create a full employment economy. It makes far more sense to put millions of people back to work rebuilding our crumbling infrastructure, than to have a real unemployment rate of almost 10 percent. It is far smarter to invest in jobs and educational opportunities for unemployed young people, than to lock them up and spend $80 billion a year through mass incarceration. Democratic socialism means that if someone works forty hours a week, that person should not be living in poverty: that we must raise the minimum wage to a living wage—$15 an hour over the next few years. It means that we join the rest of the world and pass the very strong Paid Family and Medical Leave legislation now in Congress. How can it possibly be that the United States, today, is virtually the only nation on earth, large or small, which does not guarantee that a working class woman can stay home for a reasonable period of time with her new-born baby? How absurd is that? Democratic socialism means that we have government policy which does not allow the greed and profiteering of the fossil fuel industry to destroy our environment and our planet, and that we have a moral responsibility to combat climate change and leave this planet healthy and inhabitable for our kids and grandchildren. Democratic socialism means, that in a democratic, civilized society the wealthiest people and the largest corporations must pay their fair share of taxes. Yes. Innovation, entrepreneurship and business success should be rewarded. But greed for the sake of greed is not something that public policy should support. It is not acceptable that in a rigged economy in the last two years the wealthiest 15 Americans saw their wealth increase by $170 billion, more wealth than is owned by the bottom 130 million Americans. Let us not forget what Pope Francis has so elegantly stated; “We have created new idols. The worship of the golden calf of old has found a new and heartless image in the cult of money and the dictatorship of an economy which is faceless and lacking any truly humane goal. It is not acceptable that major corporations stash their profits in the Cayman Islands and other offshore tax havens to avoid paying $100 billion in taxes each and every year. It is not acceptable that hedge fund managers pay a lower effective tax rate than nurses or truck drivers. It is not acceptable that billionaire families are able to leave virtually all of their wealth to their families without paying a reasonable estate tax. It is not acceptable that Wall Street speculators are able to gamble trillions of dollars in the derivatives market without paying a nickel in taxes on those transactions. Democratic socialism, to me, does not just mean that we must create a nation of economic and social justice. It also means that we must create a vibrant democracy based on the principle of one person one vote." 

// Make all the words in the text lower case and remove punctuation

function parseText(text){
  var lowerCaseText = text.toLowerCase();
  var noPuncText = lowerCaseText.replace(/(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|\"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)/g,""); 
  var textArray = noPuncText.split(' '); 
  return textArray; 
}

// Create a Markov Chain Object with the text, assigning each unique word a key, excluding the last word. The value for each key is an array of every word that follows it. 

function generateWordPairs(words) {
  var markovChain= {}; 
  
  for(var i = 0; i < words.length -1; i++){
    var currentWord = words[i]; 
    var nextWord = words[i+1]; 
    
    if (markovChain[currentWord]) { // if the object has values for the current word already
      markovChain[currentWord].push(nextWord); // push this value into that array
    } else {
      markovChain[currentWord] = [nextWord]; // not in the object yet so, make it a key with value nextWord
    }
  }
  return markovChain; 
}

var wordPairs = generateWordPairs(parseText(text));
console.log(wordPairs); 

// Generate a random word from the poem 

function randomWord(wordArray){ 
  var randomIndex = parseInt(Math.random() * wordArray.length);
  return wordArray[randomIndex]; 
}

// Create a line of poetry 

function writeLine(mcObj, minWords){
  var textArray = Object.keys(mcObj); // array of all the keys
  var word = randomWord(textArray); // chooses a random word from the array of keys
  var line = [word]; // this is an array of each word in the line 
  
  while (line.length < minWords){  // while the line is less than the assigned length
    var nextWord = mcObj[word]; // assign nextWord to the values array for the word 
    word = randomWord(nextWord); // then re-assign word to a random word chosen from the values array
    line.push(word); // then populate the line with that word
    if(!(mcObj[word])){ // if this word doesn't have any values
      word = randomWord(textArray); // pick a new word and keep going 
    }
  }
  return line.join(' '); 
}

// Write the poem, specifying how many lines and how many words per line

function generatePoem(wordCorpus, numLines, numWords){
  var poem = []; 
  for(var i =0; i <= numLines; i++){
    poem.push(writeLine(wordCorpus, numWords)); 
  }
  return poem; 
}

generatePoem(wordPairs, 10, 4); 
