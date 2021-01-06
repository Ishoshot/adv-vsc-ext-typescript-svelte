
import * as vscode from 'vscode';
import { HelloWorldPanel } from './HelloWorldPanel';
import { SidebarProvider } from './SidebarProvider';


export function activate(context: vscode.ExtensionContext) {

	
	const sidebarProvider = new SidebarProvider(context.extensionUri);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
		"vstodo-sidebar",
		sidebarProvider
		)
	);

	const item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);

	item.text = "$(file-code) Add Todo";
	item.command = "vstodo.addTodo";
	item.show();

	context.subscriptions.push(
		vscode.commands.registerCommand('vstodo.addTodo', () => {
			const activeTextEditor = vscode.window.activeTextEditor;

			if(!activeTextEditor){
				return vscode.window.showInformationMessage('No Active text Editor');
			}else{
				const text = activeTextEditor.document.getText(activeTextEditor.selection);

				vscode.window.showInformationMessage("Text: " + text);

				sidebarProvider._view?.webview.postMessage({
					type: "new-todo",
					value: text
				})

				return;
			}
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('vstodo.helloWorld', () => {
			HelloWorldPanel.createOrShow(context.extensionUri);
		})
	);


	context.subscriptions.push(
		vscode.commands.registerCommand('vstodo.refresh', async () => {
			// HelloWorldPanel.kill();
			// HelloWorldPanel.createOrShow(context.extensionUri);

			await vscode.commands.executeCommand("workbench.action.closeSidebar");
			await vscode.commands.executeCommand("workbench.view.extension.vstodo-sidebar-view");

			setTimeout(() => {
				vscode.commands.executeCommand("workbench.action.webview.openDeveloperTools");
			}, 500);
		}) 
	);


	context.subscriptions.push(
		vscode.commands.registerCommand("vstodo.askQuestion", async () => {
			const answer = await vscode.window.showInformationMessage("How was your day?", "good", "bad");

			if (answer !== undefined) {
				switch (answer) {
					case "bad":
						vscode.window.showInformationMessage("Sorry, ");
						break;
					case "good":
						vscode.window.showInformationMessage("Yeeh, ");
						break;
					default:
						vscode.window.showInformationMessage("Nothing");
						break;
				}
			}
		})
	);
}

// this method is called when your extension is deactivated
export function deactivate() {}
