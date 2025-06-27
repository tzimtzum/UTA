// src/app/api/guru/agents/JewishStoriesAgent.js

const storyLibrary = [
  {
    title: "The Rebbe and the Stolen Watch",
    theme: "honesty",
    style: "emotional",
    mashal: false,
    content: `A young boy once stole a watch in Cheder. The Rebbe lined up all the boys and said, 'Whoever took the watch, return it. I will close my eyes. No one will know.' The watch was returned. Many years later, a man confessed to his Rebbe: 'I was that boy.' The Rebbe replied, 'So was I.'`
  },
  {
    title: "Mashal of the Broken Window",
    theme: "teshuva",
    style: "mashal",
    mashal: true,
    content: `A child broke his father’s prized stained-glass window. He feared telling the truth. But when he confessed, the father said, 'I can fix glass. But what I really wanted to see was that my son is whole.'`
  }
];

function filterStories({ topic, style }) {
  return storyLibrary.filter(story => {
    const matchTheme = topic ? story.theme.includes(topic.toLowerCase()) : true;
    const matchStyle = style ? story.style === style.toLowerCase() : true;
    return matchTheme && matchStyle;
  });
}

function generateOriginalStory({ topic, style }) {
  // Placeholder – Replace with future GPT-powered generation logic
  return {
    title: `A Tale of ${topic || 'Inspiration'}`,
    theme: topic,
    style,
    content: `Once upon a time in a small shtetl... a story was born to express the value of ${topic}.`
  };
}

async function JewishStoriesAgent({ topic, style, format = 'select' }) {
  const filtered = filterStories({ topic, style });
  
  if (format === 'select' && filtered.length > 0) {
    return filtered;
  }

  return [generateOriginalStory({ topic, style })];
}

module.exports = {
  JewishStoriesAgent
};
