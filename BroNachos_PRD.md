# Bro-Nachos
## Table of Contents
* [Basic Problem Domain](### Basic Problem Domain)
* [Onboarding Screen](### Onboarding)
* [Nacho Builder Screen](### Nacho Builder Screen)
* [Nacho Results Page](### Nacho Results Page)
* [Point System](### Point System)
* [Initial Data Required](### Initial Data Required)

### Basic Problem Domain
* match BroNachos within the class
  * BroNacho Constructor (group members/instructors as preset instances)
  * sign in for users (to avoid becoming your own BroNacho)
  * form to collect nachoInput
    * Data collection will vary (need to evaluate pictures, field with checkboxes, selector, etc.) and we will evaluate these options
    * Error validation (TBD) to ensure successful calculation of BroNacho score
  * Upon submission of form:
    * loop through each instance (aka visitor) and compare all ingredients between instances using matching algorithm
      * points for false/false match + true/true match, no points if false/true
    * Sort that array to sort highest number of matches between multiple instances
  * Redirect to results page:
    

### Onboarding
* Welcome screen with bro-natured imagery
* Input field to capture name of visitor
* Button to trigger nacho builder

### Nacho Builder Screen
* List of Ingredients
  * Chips
  * Cheese
  * Beans
  * Jalapenos
  * Types of meat
  * Onions
  * Cilantro
  * Sour cream
  * Salsa
  * Guacamole
  * Olives
  * avocado
  * pico de gallo
* Nacho builder workflows
  * Requirements:
    * Must present ingredients to site visitor in some manner:
      * Slider with images presenting different ingredient options
      * Slider with text and checkboxes to select ingredient options
      * Ingredients will be available for selection in yes/no, multiple choice, and on gradient scale (hate it, like it, love it, etc.)
    * Visitor must select one ingredient per set of ingredients
    * Log responses in localStorage
    * *Stretch goal:* as visitor selects ingredients, provide a visual representation of current state of nachos

### Nacho Results Page
* Present final version of nacho ingredients selected to visitor
* Present total calculated bro-nachos points to visitor
* Compare visitor bro-nachos points to bro-nachos points of other visitors
* Calculate difference between visitor bro-nachos points and previous bro-nachos bro points
* Determine "match" between visitor and existing bros

### Point System
* Standard number of points assigned to each ingredient (+10 to guacamole, etc.)
* As visitor builds their nacho, run function to sum total number of points assigned to a bro variable
* Each "user" aka visitor to site has a bro number associated with them

### Initial Data Required
* Starter data of 4 users and their bro-level
* Array listing user name, nacho ingredients, and bro-nachos score
* Sync to Google Sheets to store and retrieve user data
