import React, {useState} from "react";
import "./FormFill.css";
import McqQuestion from "../mcqQuestion/McqQuestion";


const FormFill = () => {
    const [categories, setCategories] = useState([]);
    const [categoryInput, setCategoryInput] = useState("");
    const [selectedItem, setSelectedItem] = useState("");
    const [categoryAnswer, setCategoryAnswer] = useState("");
    const [ansWithCategory, setAnsWithCategory] = useState([
      {
        category: "",
        Answer: "",
      },
    ]);
    const [sentence, setSentence] = useState("");
    const [clickedWord, setClickedWord] = useState(null);
    const [storedWords, setStoreWords] = useState([]);
  
    const handleCategory = () => {
      if (categoryInput !== "") {
        setCategories([...categories, categoryInput]);
      }
    };
  
    const handleDelete = (idx) => {
      console.log(idx);
      const updated = categories.slice();
      updated.splice(idx, 1);
      setCategories(updated);
    };
  
    const handleSelect = (e) => {
      setSelectedItem(e.target.value);
    };
  
    const handleAddAnswerWithCategory = () => {
      setAnsWithCategory((prev) => [
        ...prev,
        {
          category: selectedItem,
          Answer: categoryAnswer,
        },
      ]);
    };
    console.log(ansWithCategory);
  
    const handleSendData = async () => {
      try {
        const response = await fetch("http://localhost:8000/form", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cat: categories,
            categoryAns: ansWithCategory,
          }),
        });
        // const data= await response.json();
        // console.log(data)
        if (response.ok) {
          console.log("User saved successfully");
        } else {
          console.error("Error saving user");
        }
      } catch (error) {
        console.error(error);
      }
    };
  
  
  
    const words = sentence.split(" ");
  
    const handleWordClick = (word) => {
      setClickedWord(word);
      setStoreWords((prev) => [...prev, word]);
    };
   console.log(storedWords)
   
  
    const handleSubmitForm = (e) => {
      e.preventDefault();
    };
  
  return (
    <form onSubmit={handleSubmitForm} action="/">
      <div className="form-container">
        <div className="form-box">
          <div className="form-header">
            <div className="logo-container">
              <img
                className="logo-image"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Google_Forms_logo_%282014-2020%29.svg/1489px-Google_Forms_logo_%282014-2020%29.svg.png"
                alt=""
              />
              <h1 className="logo-text">Untitled form</h1>
            </div>
            <button className="btn-header" onClick={handleSendData}>
              Send
            </button>
          </div>
          <div className="first-form">
            <h1>Question 1</h1>
            <div className="categories-containter">
              <h2>Categories</h2>
              <div className="category-input">
                <input
                  type="text"
                  placeholder="Category name"
                  onChange={(e) => setCategoryInput(e.target.value)}
                />
                <button className="add-cat-btn" onClick={handleCategory}>
                  Add
                </button>
              </div>
              <div className="category-list">
                {categories.map((el, idx) => (
                  <div key={idx} className="cattegory-sublist">
                    <p>{el}</p>
                    <button
                      className="list-btn"
                      onClick={() => handleDelete(idx)}
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <h3 className="item-text">Items</h3>
            <div className="items-Cat-container">
              <div className="items-container">
                <input
                  type="text"
                  placeholder="Item name"
                  value={categoryAnswer}
                  onChange={(e) => setCategoryAnswer(e.target.value)}
                />
              </div>
              <div className="category-select-container">
                <select value={selectedItem} onChange={handleSelect}>
                  <option value="">Select Category</option>
                  {categories.map((el, i) => (
                    <option key={i} value={el}>
                      {el}
                    </option>
                  ))}
                </select>
                <button
                  className="add-cat-btn"
                  onClick={handleAddAnswerWithCategory}
                >
                  Add
                </button>
              </div>
            </div>
            {ansWithCategory.map((el, i) => (
              <div key={i} className="ansWithCategory-list">
                <p>{el.category}</p>
                <p>{el.Answer}</p>
              </div>
            ))}
          </div>
          <div className="second-form">
            <h1>Question 2</h1>
            <div className="preview-box">
              <h2>Preview:</h2>
              {/* <input type="text" /> */}
              <div>
                {words.map((word, index) => (
                  <span
                    key={index}
                    className={clickedWord === word ? "clicked" : ""}
                    onClick={() => handleWordClick(word)}
                  >
                    {word}{" "}
                  </span>
                ))}
              </div>
            </div>
            <div className="sentence-box">
              <h2>Sentence</h2>
              <div className="sentence-input">
                <input
                  type="text"
                  onChange={(e) => setSentence(e.target.value)}
                />
                <button className="add-cat-btn">Add</button>
              </div>
            </div>
            <div className="option-box">
             
              {/* <input type="text" placeholder="option" /> */}
              <ul>
              {storedWords.map((el,i)=>(
                <div className="checkbox-list">
                <input type="checkbox" />
                <li key={i}>{el}</li>
                </div>
              ))}
              </ul>
            </div>
          </div>
          <div className="third-form">
            <h1>Question 3</h1>
            <div className="comp-box">
              <h2>Comprehension</h2>
              <div className="comp-input">
                <textarea type="text" />
                <button className="add-cat-btn">Add</button>
              </div>
            </div>
            <div className="preview-third-form">
              <h2>Preview:</h2>
              <p>i want to thanks</p>
            </div>
            <div className="mcq-box">
              <McqQuestion />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormFill;
