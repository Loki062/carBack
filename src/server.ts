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

    // Log para verificar os dados recebidos
    console.log("Dados recebidos:", req.body);

    // Validação simples para garantir que todos os campos estão presentes
    if (!name || !car || !placa || !inital_date || !final_Date) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    try {
        // Verifica se as datas são válidas
        const parsedInitialDate = new Date(inital_date);
        const parsedFinalDate = new Date(final_Date);

        // Valida se as datas são válidas
        if (isNaN(parsedInitialDate.getTime()) || isNaN(parsedFinalDate.getTime())) {
            return res.status(400).json({ error: "Datas inválidas fornecidas." });
        }

        // Cria o agendamento
        const newAppointment = await prisma.carappointment.create({
            data: {
                name,
                car,
                placa,
                inital_date: parsedInitialDate,
                final_Date: parsedFinalDate,
            },
        });

        res.status(201).json(newAppointment);
    } catch (error) {
        console.error("Erro ao criar agendamento de carro:", error);
        res.status(400).json({ error: "Erro ao criar agendamento de carro." });
    }
});
  
// Endpoint para obter todos os agendamentos de carros
app.get("/car-appointments", async (req, res) => {
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
