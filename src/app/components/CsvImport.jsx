"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { readString } from "react-papaparse";
import { Button, Input } from "@chakra-ui/react";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Link from "next/link";

function CsvImport() {
  const [collectionId, setCollectionId] = useState("");
  const [documentId, setDocumentId] = useState("");

  const dataSets = [
    { name: "name", headerName: "氏名" },
    { name: "EnScore", headerName: "英語得点" },
    { name: "EnDev", headerName: "英語偏差値" },
    { name: "LiScore", headerName: "リス得点" },
    { name: "LiDev", headerName: "リス偏差値" },
    { name: "EnLiDev", headerName: "英＋Ｌ偏差値" },
    { name: "MtScore", headerName: "数学得点" },
    { name: "MtDev", headerName: "数学偏差値" },
    { name: "Mt1Score", headerName: "数学１得点" },
    { name: "Mt1Dev", headerName: "数学１偏差値" },
    { name: "Mt2Score", headerName: "数学２得点" },
    { name: "Mt2Dev", headerName: "数学２偏差値" },
    { name: "Mt12Dev", headerName: "数学１２偏差値" },
    { name: "NJaScore", headerName: "現代文得点" },
    { name: "NJaDev", headerName: "現代文偏差値" },
    { name: "AJaScore", headerName: "現古得点" },
    { name: "AJaDev", headerName: "現古偏差値" },
    { name: "AnScore", headerName: "古文得点" },
    { name: "AnDev", headerName: "古文偏差値" },
    { name: "CJaScore", headerName: "漢文得点" },
    { name: "CJaDev", headerName: "漢文偏差値" },
    { name: "JaScore", headerName: "現古漢得点" },
    { name: "JaDev", headerName: "現古漢偏差値" },
    { name: "JaScore", headerName: "国語得点" },
    { name: "JaDev", headerName: "国語偏差値" },
    { name: "PhScore", headerName: "物理得点" },
    { name: "PhDev", headerName: "物理偏差値" },
    { name: "ChScore", headerName: "化学得点" },
    { name: "ChDev", headerName: "化学偏差値" },
    { name: "BiScore", headerName: "生物得点" },
    { name: "BiDev", headerName: "生物偏差値" },
    { name: "BPhScore", headerName: "物理基礎得点" },
    { name: "BPhDev", headerName: "物理基礎偏差値" },
    { name: "BChScore", headerName: "化学基礎得点" },
    { name: "BChDev", headerName: "化学基礎偏差値" },
    { name: "BBiScore", headerName: "生物基礎得点" },
    { name: "BBiDev", headerName: "生物基礎偏差値" },
    { name: "WHScore", headerName: "世史得点" },
    { name: "WHDev", headerName: "世史偏差値" },
    { name: "JHScore", headerName: "日史得点" },
    { name: "JHDev", headerName: "日史偏差値" },
    { name: "GeScore", headerName: "地理得点" },
    { name: "GeDev", headerName: "地理偏差値" },
    { name: "PEScore", headerName: "政経得点" },
    { name: "PEDev", headerName: "政経偏差値" },
    { name: "EtScore", headerName: "倫理得点" },
    { name: "EtDev", headerName: "倫理偏差値" },
    { name: "InScore", headerName: "情報１得点" },
    { name: "InDev", headerName: "情報１偏差値" },
    { name: "Com1Dev", headerName: "総合１偏差値" },
    { name: "Com1Dev", headerName: "総合１偏差値" },
    { name: "Com2Dev", headerName: "総合２偏差値" },
    { name: "EnMtJaDev", headerName: "英数国偏差値" },
    { name: "EnMtDev", headerName: "英数偏差値" },
    { name: "EnJaDev", headerName: "英国偏差値" },
  ];

  const handleFileRead = useCallback(
    (binaryStr) => {
      readString(binaryStr, {
        worker: true,
        header: true,
        complete: async (results) => {
          try {
            if (collectionId && documentId) {
              const collectionRef = collection(db, collectionId);
              const documentRef = doc(collectionRef, documentId);
              const batch = [];
              const nameDocument = doc(collectionRef, "名前");
              const nameIndex = results.meta.fields.findIndex(
                (field) => field === "氏名"
              ); // ヘッダー名が "氏名" の列のインデックスを取得
              if (nameIndex !== -1) {
                let nameSet = {};
                for (let i = 0; i < results.data.length; i++) {
                  const rowData = results.data[i];
                  const subCollectionName = rowData["氏名"]; // "名前" というヘッダー名に対応するデータを取得
                  nameSet[i] = rowData["氏名"];
                  const subCollectionRef = collection(
                    documentRef,
                    subCollectionName
                  ); // サブコレクションを作成する
                  setDoc(nameDocument, nameSet);
                  const dataset = {};
                  for (const data of dataSets) {
                    if (rowData[data.headerName]) {
                      dataset[data.name] = rowData[data.headerName];
                    }
                  }
                  batch.push(addDoc(subCollectionRef, { ...dataset }));
                }
                await Promise.all(batch);
                console.log("Data uploaded successfully.");
              } else {
                console.error("Header '名前' not found in the CSV file.");
              }
            } else {
              console.error("Collection ID or Document ID is missing.");
            }
          } catch (error) {
            console.error("Error uploading data:", error);
          }
        },
      });
    },
    [collectionId, documentId]
  );

  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onabort = () => console.log("File reading was aborted");
        reader.onerror = () => console.log("File reading has failed");
        reader.onload = () => {
          const binaryStr = reader.result;
          handleFileRead(binaryStr);
        };
        reader.readAsText(file);
      });
    },
    [handleFileRead]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="App">
      <Link href="/">戻る</Link>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
      </div>
      <div>
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <>
            <Input
              placeholder="Enter Collection ID"
              value={collectionId}
              onChange={(e) => setCollectionId(e.target.value)}
            />
            <Input
              placeholder="Enter Document ID"
              value={documentId}
              onChange={(e) => setDocumentId(e.target.value)}
            />
            <div {...getRootProps()}>
              <Button>ファイルを選択</Button>
            </div>
            <p>or drag and drop a file</p>
          </>
        )}
      </div>
    </div>
  );
}

export default CsvImport;
