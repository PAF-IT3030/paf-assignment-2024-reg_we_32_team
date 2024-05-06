import React from "react";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import eatPlan from "../../assets/eatPlan.jpg";
import pyramid from "../../assets/Pyramid.jpg";
import "./MealFront.css"; // Import CSS file for styling
import timetableMeal from "../../assets/timetableMeal.jpg";

function MealFront() {
  return (
    <div className="meal-front-container">
      <Typography variant="h4">Welcome to MealFront!</Typography>
      <Typography paragraph>
        This page will contain content related to meal planning, recipes, and
        nutrition.
      </Typography>
      {/* Link to the posts page */}
      <Link to="/user/posts" className="link">
        <button>Plan Post</button>
      </Link>
      
      {/* Image with description */}
      <div className="meal-image-container">
        <img src={eatPlan} alt="Meal Planning" className="meal-image" />
        <Typography variant="body1" className="meal-description">
          Meal planning is the process of building a weekly menu to best suit your nutritional needs.
          Some people follow a meal plan with a specific outcome in mind, such as weight loss or cholesterol improvements.
          Or an athlete may plan their meals to ensure that they get enough of the nutrients they need to perform.
        </Typography>
      </div>
      <div className="meal-image-container">
        <img src={timetableMeal} alt="Meal Planning" className="meal-image" />
        <Typography variant="body1" className="meal-description">
          Your 28 days are up; you look great and want to keep it that way.
          Juge has an easy plan to maintain your body, yet enjoy greater flexibility with your diet.
          No.1, he says, is to eat a good, clean breakfast.
        </Typography>
      </div>
      <div className="meal-image-container">
        <img src={pyramid} alt="Meal Planning" className="meal-image" />
        <Typography variant="body1" className="meal-description">
          Explore delicious meal plans and recipes for a healthy lifestyle.
        </Typography>
      </div>
    </div>
  );
}

export default MealFront;
