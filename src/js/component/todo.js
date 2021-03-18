import React, { useState, useEffect, useRef } from "react";
import Item from "./Item";
import ListItem from "./ListItem";

export const TodoApp = () => {
	let [lista, setLista] = useState([]);
	let [tarea, setTarea] = useState("");

	const minPassword = /^.{6,}$/;
	const oneLetter = /\w*[a-zA-Z]\w*/;

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
		tempList.splice(pos, 1);
		setLista(tempList);

		console.log(lista);
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
