<?php
	
	function sql($sql) {
						// Aufruf der Funktion zur Erstellung einer DB-Verbindung
		
		$conn = connect();

					// Deklaration aller Daten als UTF-8, um Probleme mit Umlauten zu vermeiden
		
		$conn->set_charset('utf8');

				// Ausführung des Statements und Speichern des Ergebnisses
		
		$result = $conn->query($sql);
		
		// Handling wenn das Statement kein Select war
		
		
		if (gettype($result) == 'boolean') {
			// Rückgabe: War die Abfrage erfolgreich oder nicht?
			
			return $result;
		
		}
							// Handling wenn das Statement ein Select war
		
		else {
							// Iteration über alle Ergebnisreihen zum Auslesen des Ergebnisses
			
			$rows = array();
			
			while ($r = $result->fetch_assoc()) {
				
				$rows[] = $r;
			
			};
						// Rückgabe: Ergebnis
			
			return $rows;
		
		};

							// Schließen von Ergebnisset und Verbindung zur Freigabe von Ressourcen
		
	
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

		// Prüfung der Verbindung
		

		if ($conn->connect_error) {
			
			die($conn->connect_error);
		
		};

							// Rückgabe der Verbindung
		
		
		return $conn;
	
	}

?>