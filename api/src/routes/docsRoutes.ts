import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

const router = Router();

const swaggerPath = path.join(__dirname, "../../openapi.yaml");
const swaggerDocument = YAML.load(swaggerPath);

router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(swaggerDocument));

export default router;
