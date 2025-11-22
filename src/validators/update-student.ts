import z from "zod";
import { createClassFormSchema } from "./create-class";

export type UpdateClassFormData = z.infer<typeof createClassFormSchema>