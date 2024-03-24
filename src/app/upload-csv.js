"use client";
import { firestore } from "../../lib/firebase";
import { parseCSV } from "../../utils/parseCSV";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const fileBuffer = req.body;
      const data = await parseCSV(fileBuffer);

      const batch = firestore.batch();
      data.forEach((doc) => {
        const { grade, className, number, subject, score } = doc;
        const personId = `${grade}_${className}_${number}`;
        const docRef = firestore
          .collection("testResults")
          .doc(personId)
          .collection("subjects")
          .doc();
        batch.set(docRef, { subject, score });
      });

      await batch.commit();
      res
        .status(200)
        .json({ message: "CSVファイルが正常にアップロードされました。" });
    } catch (error) {
      console.error("CSVファイルのアップロードに失敗しました。", error);
      res
        .status(500)
        .json({ message: "CSVファイルのアップロードに失敗しました。" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
