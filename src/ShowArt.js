import { useEffect, useState } from "react";

export const ShowArt = () => {
  const [artWork, setArtWork] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [search, setSearch] = useState("dog");
  const [startSearch, setStartSearch] = useState(false);

  useEffect(() => {
    const searchUrl =
      "https://api.artic.edu/api/v1/artworks/search?q=" +
      search +
      "&query[term][is_public_domain]=true&fields=id,title,image_id&limit=1";

    setStartSearch(false);
    setIsLoaded(false);
    fetch(searchUrl)
      .then((result) => result.json())
      .then((result) => {
        setIsLoaded(true);
        setArtWork(result);
        console.log(result);
      });
  }, [startSearch]);

  const onChange = (event) => {
    setSearch(event.target.value);
  };

  const onClick = () => {
    setStartSearch(true);
  };

  const imageSrc =
    artWork.config.iiif_url +
    "/" +
    artWork.data[0].image_id +
    "/full/843,/0/default.jpg";
  return (
    <div>
      <h2>ShowArt</h2>
      <div>
        <lable>Enter in search term:</lable>
        <input type="text" value={search} onChange={onChange} />
        <button onClick={onClick}>Search</button>
      </div>
      {isLoaded && (
        <div>
          <img src={imageSrc} />
          <div>{artWork.data[0].title}</div>
        </div>
      )}
      {!isLoaded && <p>Loading...</p>}
    </div>
  );
};
