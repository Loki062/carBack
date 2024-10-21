import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import cors from "cors";
import { body, validationResult } from 'express-validator';

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(express.json());
app.use(cors());

// Endpoint para a raiz
app.get("/", (req: Request, res: Response): void => {
  res.send("Welcome to the API!");
});

// Endpoint para criar agendamentos
app.post('/create-appointments', [
  body('name').isString().notEmpty(),
  body('room').isString().isIn(['Sala de Treinamento', 'Sala de Reunião']),
  body('inital_date').isISO8601(),
  body('final_Date').isISO8601().custom((value: string, { req }) => {
    if (new Date(value) <= new Date(req.body.inital_date)) {
      throw new Error('Horário de término deve ser posterior ao horário de início.');
    }
    return true;
  }),
], async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return; // Retornar após enviar a resposta
  }

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
app.get("/Appointment", async (req: Request, res: Response): Promise<void> => {
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
