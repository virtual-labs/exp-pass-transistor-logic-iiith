# Design of 2-input Multiplexer

## Components Required -

- 2 Pass transistors

## Circuit Connections -

- Drag the Pass transistors on the workspace
- Connect the left node of pass transistors 1 and 2 to input 1 and input 2 respectively
- Clk is connected to the top node of pass transistor 1 and bottom node of pass transistor 2
- Clk_bar is connected to the bottom node of pass transistor 2 and top node of pass transistor 1
- Right nodes of pass transistors are then connected to the output

## Observations -

- On clicking "validate" option after completing the circuit (assuming all connections are done correctly) you should see a graph under the observations tab
- Observe the fluctuations occurring
- By default, the input has been set to 1 and the corresponding output observed is 0. To check otherwise, double-click the input.

# Schematic Design of Pass Transistor

## Components Required -

- 1 Clk
- 1 Clk_bar
- 1 PMOS
- 1 NMOS

## Circuit Connections -

- Drag the Clk, Clk_bar, PMOS and NMOS to the workspace
- Connect input 1 to the top node of PMOS and bottom node of NMOS
- Connect Clk to the middle node of PMOS and Clk_bar to the middle node of NMOS
- Finally, to complete the circuit, connect bottom node of PMOS and top node of NMOS to the output

## Observations -

- On clicking "validate" option after completing the circuit (assuming all connections are done correctly) you should see a graph under the observations tab

- Observe the fluctuations occurring
