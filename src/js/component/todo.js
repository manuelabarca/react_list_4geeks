import React, { useState, useEffect, useRef } from "react";
import Item from "./Item";
import ListItem from "./ListItem";

export const TodoApp = () => {
	let [lista, setLista] = useState([]);
	let [tarea, setTarea] = useState("");

	const minPassword = /^.{6,}$/;
	const oneLetter = /\w*[a-zA-Z]\w*/;

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/manulabarca", {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log("respuesta", resp);

				fetch(
					"https://assets.breatheco.de/apis/fake/todos/user/manulabarca",
					{
						method: "GET",

						headers: {
							"Content-Type": "application/json"
						}
					}
				)
					.then(resp => {
						console.log("respuesta", resp);
						return resp.json();
					})
					.then(data => {
						setLista(data);
					})

					.catch(err => {
						console.log("error", err);
					});
			})

			.catch(err => {
				console.log("error", err);
			});
	}, []);

	useEffect(() => {
		if (!minPassword.test(tarea)) {
			console.error("No cumple con largo minimo de 6");
		}
		if (!oneLetter.test(tarea)) {
			console.error("Minimo una letra");
		}
	}, [tarea]);

	const addTarea = tarea => {
		if (tarea.key === "Enter") {
			setLista([...lista, tarea.target.value]);
			tarea.target.value = "";
		}
	};

	const delTarea = pos => {
		const tempList = [...lista];
		console.log("previo borrado", tempList);
		tempList.splice(pos, 1);
		console.log("Lista temporal", tempList);
		const methods = ["PUT", "DELETE"];
		if (tempList.length > 0) {
			fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/manulabarca",
				{
					method: methods[0],
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(tempList)
				}
			)
				.then(resp => {
					console.log("Respuesta de borrado", resp);
					setLista(tempList);
					console.log(lista);
				})
				.catch(error => {
					console.log("Error delete", error);
				});
		} else {
			fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/manulabarca",
				{
					method: methods[1],
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(tempList)
				}
			)
				.then(resp => {
					console.log("Respuesta de borrado", resp);
					setLista(tempList);
					console.log(lista);
				})
				.catch(error => {
					console.log("Error delete", error);
				});
		}
	};

	const newList = lista.map((value, index) => (
		<Item key={index} value={value} index={index} onClick={delTarea} />
	));

	return (
		<div className="text-center mt-5">
			<div className="container">
				<div className="row">
					<div className="col-12 col-md-6">
						<h6 className="text-muted">To Do List</h6>
						<input
							id="campito"
							onKeyDown={addTarea}
							className="form-control"
							type="text"
							placeholder="Add a thing"
							onChange={e => setTarea(e.target.value)}></input>
						<br />
						<ListItem list={newList} />
					</div>
				</div>
			</div>
			<p>Total Items: {lista.length}</p>
		</div>
	);
};
