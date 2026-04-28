"use client"

import React, { useRef, useState } from "react"
import styles from "./page.module.css"

interface SolveResult {
  section: string;
  questionType: string;
  correctChoice: string;
  explanation: string;
  wasUserCorrect: string;
  trapType: string;
}

export default function Home() {
  const [data, setData] = useState<SolveResult | null>(null)
  const [loading, setLoading] = useState<boolean>(false);
  
  const questionText = useRef<HTMLTextAreaElement>(null);
  const userAnswer = useRef<HTMLInputElement>(null);
  
  const handleSolve = async () => {
    const question = questionText.current?.value;
    const answer = userAnswer.current?.value;

    if (!question) {
      alert("Please enter a question");
      return;
    }

    setLoading(true);
    setData(null);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 90000);

      const res = await fetch("https://dsatprep-backend.onrender.com/solve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionText: question, userAnswer: answer })
      })

      clearTimeout(timeoutId);

      const data = await res.json();
      setData(data);
    } catch(err: unknown) {
      if (err instanceof DOMException && err.name === "AbortError") {
        alert("Request timed out. The server might be waking up. Please try again in a few seconds.");
      } else {
        console.error("Error", err);
        alert("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }   

  return (
    <div className={styles.home_page}>
      <div className={styles.card_wrapper}>
        <div className={styles.card}>
          <div className={styles.card_overview}>
            <h1 className={styles.card_title}>Master DSAT Questions with AI Trap Analysis</h1>
            <p className={styles.card_description}>Paste any DSAT question, choose your answer, and get the correct answer, explanation, trap type, and strategy to avoid the same mistake again.</p>
          </div>

          <div className={styles.card_request_field}>
            <div className={styles.question_text_box}>
              <label htmlFor="questionText">Question:</label>
              <textarea
              ref={questionText}
              name="questionText"
              id="questionText"
              className={styles.question_text}
              placeholder="Please paste your question here..."
              ></textarea>
            </div>
            <div className={styles.solve_field}>
              <div className={styles.user_answer}>
                <label htmlFor="user_answer">Your Answer:</label>
                <input ref={userAnswer} type="text" id="user_answer" placeholder="Enter your answer..." />
              </div>
              <button className={styles.solve_ai} onClick={handleSolve} disabled={loading}>{ loading ? "Analyzing" : 'Analyze Question' }</button>
            </div>
          </div>
        </div>
      </div>
      {data ? 
      <div className={styles.response_wrapper}>
        <div className={styles.response}>
          <div className={styles.response_header}>
            <h2>{data.section.toUpperCase()}</h2>
            <p>{data.questionType}</p>
          </div>
          <div className={styles.response_main}>
            <label className={styles.response_explanation}>Explanation</label>
            <p>{data.explanation}</p>
            <label className={styles.response_answer}>Answer "{data.correctChoice}" is correct!</label>
          </div>
          <div className={styles.response_footer}>
            <p className={styles.response_user_answer_check}>Your answer is <span>{data.wasUserCorrect}!</span></p>
            <p className={styles.response_trap}>Trap type: {data.trapType}</p>
          </div>
        </div>
      </div>
      : null}
    </div>
  )
}