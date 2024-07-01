import React from "react";
import { useQuery } from "react-query";

const fetchTopStories = async () => {
  const response = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json"
  );
  const storyIds = await response.json();
  const stories = await Promise.all(
    storyIds.slice(0, 10).map(async (id) => {
      const storyResponse = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      );
      return storyResponse.json();
    })
  );
  return stories;
};

const Index = () => {
  const { data, error, isLoading } = useQuery("topStories", fetchTopStories);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading stories</div>;

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div>
        <h1 className="text-3xl text-center mb-4">Hacker News Top Stories</h1>
        <ul>
          {data.map((story) => (
            <li key={story.id} className="mb-2">
              <a href={story.url} className="text-blue-500">
                {story.title}
              </a>
              <p>by {story.by}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Index;