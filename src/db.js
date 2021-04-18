import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('post.db')

export class DB {
  constructor() {}

  static init() {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        const sqlStatement =
          'CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY NOT NULL, date TEXT, text TEXT NOT NULL, img TEXT, booked INTEGER)'
        tx.executeSql(sqlStatement, [], resolve, (_, err) => reject(err))
      })
    })
  }

  static getAllPosts() {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        const sqlStatement = 'SELECT * FROM posts'
        tx.executeSql(
          sqlStatement,
          [],
          (_, result) => resolve(result.rows._array),
          (_, err) => reject(err)
        )
      })
    })
  }

  static addPost({ text, img, date, booked }) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        const sqlStatement = `INSERT INTO posts (text, img, date, booked) VALUES (?, ?, ?, ?)`
        const args = [text, img, date, Number(booked)]

        tx.executeSql(
          sqlStatement,
          args,
          (_, result) => resolve(result.insertId),
          (_, err) => reject(err)
        )
      })
    })
  }

  static updatePost({ id, booked }) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        const sqlStatement = `UPDATE posts SET booked = ? WHERE id = ?`
        const args = [booked, id]

        tx.executeSql(sqlStatement, args, resolve, (_, err) => reject(err))
      })
    })
  }

  static deletePost(id) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        const sqlStatement = `DELETE FROM posts WHERE id = ?`
        tx.executeSql(sqlStatement, [id], resolve, (_, err) => reject(err))
      })
    })
  }
}
