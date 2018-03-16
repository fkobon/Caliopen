package main

import (
	"fmt"
	"github.com/CaliOpen/Caliopen/src/backend/protocols/go.imap/cmd/imapworker/cli_cmds"
	"os"
)

func main() {
	if err := cmd.RootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(-1)
	}
}
