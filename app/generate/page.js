"use client";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Container, DialogActions, DialogContentText, DialogContent, DialogTitle, Box, TextField, Typography, Button ,Dialog} from "@mui/material";
import {doc, collection, setDoc, getDoc, writeBatch} from 'firebase/firestore'
import {soc} from '@firebase/firestore'

export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    fetch("api/generate", {
      method: "POST",
      body: text,
    })
      .then((res) => res.json())
      .then(data > setFlashcards(data));
  };

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveFlashcards = async () => {
    if (!name) {
      alert("Please Enter A Name");
      return;
    }

    const batch = writeBatch(db);
    const userDocRef = soc(collection(db, "users"), user.id);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const collections = docSnap.data().flashcards || [];
      if (collections.find((f) => f.name === name)) {
        alert("Flashcard collection with name already exists");
        return;
      } else {
        collections.push({ name });
        batch.set(userDocRef, { flashcards: collections }, { merge: true });
      }
    } else {
      batch.set(userDocRef, { flashcards: [{ name }] });
    }

    const colRef = collection(userDocRef, name);
    flashcards.forEach((flashcard) => {
      const cardDocRef = doc(colRef);
      batch.set(cardDocRef, flashcard);
    });
    await batch.commit();
    handleClose();
    router.push("/flashcards");
  };

  return (
    <Container>
      <form>
        <label>Generate Flashcards</label>
        <input type="textarea"></input>

        <button onClick={handleSubmit}>Submit</button>
      </form>

      {flashcards.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5">Flashcards Preview</Typography>
          <Grid container spacing={3}>
            {flashcards.map((flashcard, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <cardActionArea onClick={() => handleCardClick(index)}>
                  <CardContent>
                    <Box
                      sx={{
                        perspective: "1000px",
                        "& > div": {
                          transition: "transform 0.6s",
                          transformStyle: "preserve-3d",
                          position: "relative",
                          width: "100%",
                          height: "200px",
                          boxShadow: "0 4px 4px 0 rgba(0,0,0,0.2)",
                          transform: flipped(index)
                            ? "rotateY(180deg)"
                            : "rotateY(0deg)",
                        },

                        "& > div > div": {
                          position: "absolute",
                          width: "100%",
                          height: "200px",
                          backfaceVisibility: "hidden",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: 2,
                          boxSizing: "border-box",
                        },

                        "& > div > div : nth-of-type(2)": {
                          transform: "rotateY(180deg)",
                        },
                      }}
                    >
                      <div>
                        <div>
                          <Typography variant="h5" component="div">
                            {flashcard.front}
                          </Typography>
                        </div>
                        <div>
                          <Typography variant="h5" component="div">
                            {flashcard.back}
                          </Typography>
                        </div>
                      </div>
                    </Box>
                  </CardContent>
                </cardActionArea>
              </Grid>
            ))}
          </Grid>

          <Box sx = {{mt : 4, display :'flex', justifyContent :'center'}}>
            <Button variant = 'contained' onClick = {handleOpen} color = 'primary'>
              Save Flashcards
            </Button>

          </Box>
        </Box>
      )}


      <Dialog open = {open} onClose = {handleClose} >
        <DialogTitle>Save Flashcards</DialogTitle>
        <DialogContent> 
            <DialogContentText>
                Please enter a name for your collection
            </DialogContentText>

            <TextField autoFocus margin = "dense"
            label = "Collection Name"
            type = "text"
            fullWidth
            value = {name}
            onChange = {(e) => setName(e.target.value)}
            variant = "outlined" />
        </DialogContent>

        <DialogActions>
            <Button onClick = {handleClose} color = 'primary'>
                Cancel
            </Button>

            <Button onClick = {saveFlashcards} color = 'primary'>
                Save
            </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
