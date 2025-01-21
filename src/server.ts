import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(express.json());

app.use(cors());
  
app.use(express.json());

// Endpoint para a raiz
app.get("/", (req, res) => {
  res.send("Welcome to the Agendamentos API!");
});

// Endpoint para criar agendamentos
app.post('/create-agendamento', async (req, res) => {
  const { name, car, placa, inital_date, final_Date } = req.body;

  try {
    const newAgendamento = await prisma.agendamentos.create({
      data: {
        name,
        car,
        placa,
        inital_date: new Date(inital_date),
        final_Date: new Date(final_Date),
      },
    });

    res.status(201).json(newAgendamento);
  } catch (error) {
    console.error("Erro ao criar agendamento:", error);
    res.status(400).json({ error: "Erro ao criar agendamento." });
  }
});

// Endpoint para obter todos os agendamentos
app.get("/agendamentos", async (req, res) => {
  try {
    const agendamentos = await prisma.agendamentos.findMany();
    res.json(agendamentos);
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
    res.status(500).json({ error: "Erro ao buscar agendamentos" });
  }
});

const port = 3333;

app.listen(process.env.PORT || port, () => {
  console.log(`Server listening on port ${port}`);
});
