"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { readString } from "react-papaparse";
import { Button, Input } from "@chakra-ui/react";
import { dataSets } from "../datas";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import Link from "next/link";

function CsvImport({ dataLabels }) {
  const [collectionId, setCollectionId] = useState("");
  const [documentId, setDocumentId] = useState("");
  const [checked, setChecked] = useState(false);
  const [yearSelects, setYearselects] = useState([]);

  useEffect(() => {
    let dummyArray = [];
    getDocs(collection(db, "年度一覧")).then((snap) => {
      snap.docs.map((dd) => {
        dummyArray = [...dummyArray, dd.data().collectionId];
        setYearselects(dummyArray);
      });
    });
  }, []);

  const handleFileRead = useCallback(
    (binaryStr) => {
      readString(binaryStr, {
        worker: true,
        header: true,
        complete: async (results) => {
          try {
            if (collectionId && documentId) {
              if (checked) {
                const collectionYear = collection(db, "年度一覧");
                addDoc(collectionYear, { collectionId });
              }
              const collectionRef = collection(db, "全統模試結果");
              const documentRef = doc(collectionRef, collectionId);
              const batch = [];
              const nameIndex = results.meta.fields.findIndex(
                (field) => field === "氏名"
              ); // ヘッダー名が "氏名" の列のインデックスを取得
              if (nameIndex !== -1) {
                let nameSet = {};
                const subCollectionName = documentId;
                const subCollectionRef = collection(
                  documentRef,
                  subCollectionName
                ); // サブコレクションを作成する
                for (let i = 0; i < results.data.length; i++) {
                  const rowData = results.data[i];
                  const resultDocuName = rowData["氏名"];
                  nameSet[i] = rowData["氏名"];
                  const dataset = {};
                  for (const data of dataSets) {
                    if (rowData[data.headerName]) {
                      dataset[data.name] = rowData[data.headerName];
                    }
                  }
                  const resultRef = doc(subCollectionRef, resultDocuName);
                  batch.push(setDoc(resultRef, { ...dataset }));
                }
                const nameDocument = collection(documentRef, "名前");
                addDoc(nameDocument, nameSet);
                await Promise.all(batch);
                console.log("Data uploaded successfully.");
              } else {
                console.error("Header '名前' not found in the CSV file.");
              }
            } else {
              console.error("Collection ID or Document ID is missing.");
              console.log(collectionId, documentId);
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
            {checked ? (
              <Input
                placeholder="Enter Collection ID"
                value={collectionId}
                onChange={(e) => setCollectionId(e.target.value)}
              />
            ) : (
              <select
                value={collectionId}
                onChange={(e) => setCollectionId(e.target.value)}
              >
                <option></option>
                {yearSelects.map((yearSelect) => {
                  return <option key={yearSelect}>{yearSelect}</option>;
                })}
              </select>
            )}
            <select
              value={documentId}
              onChange={(e) => setDocumentId(e.target.value)}
            >
              <option></option>
              {dataLabels.map((dataLabel) => {
                return <option key={dataLabel}>{dataLabel}</option>;
              })}
            </select>
            <input
              type="checkbox"
              value={checked}
              onChange={() => setChecked(!checked)}
            />
            <span>←年度最初の設定ならチェック</span>
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
