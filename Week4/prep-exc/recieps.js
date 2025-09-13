const mongoose=require('mongoose');
const Schema=mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/recipes',{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{console.log("connected to mongoDB")})
.catch(err=>{console.log("error connecting to mongoDB",err)});

const recipeSchema=new Schema({
    recipeName:{type:String,required:true},
    ingredients:[{type:Schema.Types.ObjectId,ref:'Ingredient'}],
    step:{type:String,required:true},
    category:[{type:Schema.Types.ObjectId,ref:'Category'}], 
});
const ingredientsSchema=new Schema({
    ingredientName:{type:String,required:true},
    quantity:{type:String,required:true}
});
const categorySchema=new Schema({
    categoryName:{type:String,required:true}
});

const Recipe=mongoose.model('Recipe',recipeSchema);
const Ingredient=mongoose.model('Ingredient',ingredientsSchema);
const Category=mongoose.model('Category',categorySchema);

//QUESTIONS
//1- What made you decide when to embed information? What assumptions did you make?
/*I decided to embed information when it belonged only to the recipe and was always needed together
Steps: I embedded them because steps only make sense inside a recipe.
Categories: I considered these separately, 
because categories are reused across recipes (e.g., “Italian” or “Vegetarian”). 
Here I assumed that if I want to filter recipes by category or manage categories independently
ingredients, I did not embed them.
 I kept them separate because I assumed I might want to filter recipes 
 by ingredient (e.g., “show me all recipes that contain tomato”).

/*

*/
//------------------------------------
//2- If you were given PostgreSQL and MongoDB as choices to build the recipe's database at the beginning, which one would you choose and why?
/* If I had to choose between PostgreSQL and MongoDB for building the recipe database,
my decision would depend on the scale of the project:
For small data sets with relatively simple recipes, I would choose MongoDB.
The main use case of a recipe application is to browse the full recipe, 
and that works very well with embedded documents.
Relationships are not very complex, and updates are usually limited to things like categories or ingredient filters.
In this scenario, MongoDB is more flexible and faster to work with.
However, for large-scale applications with millions of recipes,
I think PostgreSQL would be more efficient.
In MongoDB, i need to insert all the steps and ingredients every time you create a recipe,
which can lead to duplication. With SQL, the data is more normalized and structured,
which makes updates and inserts easier to manage in the long run.
PostgreSQL also provides stronger consistency and better performance for complex queries when dealing with very large amounts of data.*/




