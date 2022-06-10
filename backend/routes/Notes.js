const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Notes = require("../modules/Notes");
const { body, validationResult } = require("express-validator");

//ROUT 1 ----------THISE ROUT IS FOR ACCSESSING USER NOTES----------
// /user/fetchNotes/
router.get("/fetchNotes", fetchUser, async (req, res) => {
  try {
    // find the user id by req.user.id to access note
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal error occured fetchUser");
  }
});

// ROUT:2---------ADD NEW NOTE USING POST ROUT---------
// /user/addNote/
router.post(
  "/addNote",
  fetchUser,
  [
    body("title", "title must be atleast 5 character").isLength({ min: 5 }),
    body("description", "Description must be atleast 10 character").isLength({
      min: 10,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // destructuring arry of Notes
      const { title, description, tag } = req.body;

      // For Dinamically add Value To the login User db by there ID
      const notes = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      // After sending diynamic data we need to save note
      const savenote = await notes.save();

      res.json(savenote);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("some internal error occured");
    }
  }
);

// Rout:3--------- For Update data------
// /user/updateNote/:id

router.put("/updatenote/:id", fetchUser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    // create new updated note
    const updatedNote = {};

    // if element element exsist then overwrite theme else remain
    if (title) {
      updatedNote.title = title;
    }
    if (description) {
      updatedNote.description = description;
    }
    if (tag) {
      updatedNote.tag = tag;
    }

    // Find the note which you want to update by the rout parameter id
    let note = await Notes.findById(req.params.id);

    // if the note does not exsist by thise id
    if (!note) {
      return res.status(404).send("404 Code Note Found");
    }

    // verify the user who want to udate the note
    // note.user.toString() gives us the note user id in string formate
    if (note.user.toString() !== req.user.id) {
      return res
        .statusCode(401)
        .send("Unauthraized connection i am sorry babu");
    }

    // when user veryfy and note exsist then update the note
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: updatedNote },
      { new: true }
    );

    res.json(note);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("some internal error occured update");
  }
});

// ------------4 : THIS ROUT IS FOR DELETING THE NOTE-------------
// /user/deletenote
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    // Find the note which you want to delete by the rout parameter id
    let note = await Notes.findById(req.params.id);

    // if the note does not exsist by thise id
    if (!note) {
      return res.status(404).send("404 Code Note Found");
    }

    // verify the user who want to delete the note
    // note.user.toString() gives us the note user id in string formate
    if (note.user.toString() !== req.user.id) {
      return res
        .statusCode(401)
        .send("Unauthraized connection i am sorry babu");
    }

    // when user veryfy and note exsist then delete the note
    note = await Notes.findByIdAndDelete(req.params.id);

    res.json({ msg: "DEletion Succsessfull", note: note });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("some internal error occured delete");
  }
});

module.exports = router;
