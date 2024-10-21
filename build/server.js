import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(express.json());
app.use(cors());

// Endpoint para a raiz
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// Endpoint para criar agendamentos
app.post('/create-appointments', async (req, res) => {
    const { name, room, inital_date, final_Date } = req.body;

    try {
      const newAppointment = await prisma.appointment.create({
        data: {
          name,
          room,
          inital_date: new Date(inital_date),
          final_Date: new Date(final_Date),
        },
      });

      res.status(201).json(newAppointment);
    } catch (error) {
      console.error("Erro ao criar agendamento:", error);
      res.status(400).json({ error: "Erro ao criar agendamento." });
    }
});
  
// Endpoint para obter todos os agendamentos
app.get("/appointments", async (req, res) => {
  try {
    const bookings = await prisma.appointment.findMany();
    res.json(bookings);
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
    res.status(500).json({ error: "Erro ao buscar agendamentos" });
  }
});

const port = 3333;

app.listen(process.env.PORT || port, () => {
  console.log(`Server listening on port ${port}`);
});
