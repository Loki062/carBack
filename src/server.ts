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
  res.send("Welcome to the Car Booking API!");
});

// Endpoint para criar agendamentos de carros
app.post('/create-car-appointments', async (req, res) => {
    const { name, car, placa, inital_date, final_Date } = req.body;

    try {
      const newAppointment = await prisma.carappointment.create({
        data: {
          name,
          car,
          placa,
          inital_date: new Date(inital_date),
          final_Date: new Date(final_Date),
        },
      });

      res.status(201).json(newAppointment);
    } catch (error) {
      console.error("Erro ao criar agendamento de carro:", error);
      res.status(400).json({ error: "Erro ao criar agendamento de carro." });
    }
});
  
// Endpoint para obter todos os agendamentos de carros
app.get("/car-appointment", async (req, res) => {
  try {
    const bookings = await prisma.carappointment.findMany();
    res.json(bookings);
  } catch (error) {
    console.error("Erro ao buscar agendamentos de carros:", error);
    res.status(500).json({ error: "Erro ao buscar agendamentos de carros" });
  }
});

const port = 3333;

app.listen(process.env.PORT || port, () => {
  console.log(`Server listening on port ${port}`);
});
