<?php
	
	function sql($sql) {
						// Aufruf der Funktion zur Erstellung einer DB-Verbindung
		
		$conn = connect();

					// Deklaration aller Daten als UTF-8, um Probleme mit Umlauten zu vermeiden
		
		$conn->set_charset('utf8');

				// Ausf�hrung des Statements und Speichern des Ergebnisses
		
		$result = $conn->query($sql);
		
		// Handling wenn das Statement kein Select war
		
		
		if (gettype($result) == 'boolean') {
			// R�ckgabe: War die Abfrage erfolgreich oder nicht?
			
			return $result;
		
		}
							// Handling wenn das Statement ein Select war
		
		else {
							// Iteration �ber alle Ergebnisreihen zum Auslesen des Ergebnisses
			
			$rows = array();
			
			while ($r = $result->fetch_assoc()) {
				
				$rows[] = $r;
			
			};
						// R�ckgabe: Ergebnis
			
			return $rows;
		
		};

							// Schlie�en von Ergebnisset und Verbindung zur Freigabe von Ressourcen
		
	
		$result->close();
		
		$conn->close();
	
	}

	

	function connect() {
		
		$servername = "localhost";
		
		$username = "root";
			
		$password = "";
		
		$database = "storm";

					// Erstellen der DB-Verbindung 
		
		
		$conn = new mysqli($servername, $username, $password, $database);

		// Pr�fung der Verbindung
		

		if ($conn->connect_error) {
			
			die($conn->connect_error);
		
		};

							// R�ckgabe der Verbindung
		
		
		return $conn;
	
	}

?>