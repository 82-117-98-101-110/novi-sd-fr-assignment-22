import { getUserFiles } from "../../api/services/UserFilesServices";
import React, { useCallback, useEffect, useState } from "react";
import Table from "./Table";
import { useTable } from "react-table";
import Card from "../../components/cards/Card";
import styled from "styled-components";

import ButtonDownload from "../../components/button/ButtonDownload";
import { errorNotification } from "../../components/notifications/Notifications";
import ModalDeleteFile from "./ModalDeleteFile";
import LoaderCirclePrimary from "../../components/loader/LoaderCircleBig";

function UserFileList({setFilestate, newFileUploaded}) {
  const [data, setData] = useState([]);
  const [fetching, setFetching] = useState(true);

  const columns = React.useMemo(
      () => [
        {
          Header: "file name",
          accessor: "fileName",
        },
        {
          Header: "file size",
          accessor: "fileSize",
          Cell: ({ cell: { value } }) => {
            const mb = Math.floor(value / 1000000);
            return (
                <>{mb > 0.0 ? `${mb} mb${mb > 1.0 ? " " : " "} ` : "1 mb <"}</>
            );
          },
        },
        {
          Header: "",
          accessor: "id",
          Cell: ({ cell: { value } }) => {
            return (
                <>
                  <ModalDeleteFile id={value} fetchData={fetchData} />
                  <ButtonDownload id={value} />
                </>
            );
          },
        }
      ],
      []
  );

  const {} = useTable({ columns, data });

  const fetchData = useCallback(async () => {
    try {
      const response = await getUserFiles();
      if (response.status === 200) {
        setData(response.data);
        setFetching(false);
      } else {
        setData([]);
      }
    } catch (error) {
      errorNotification("Files could not be loaded");
    }
  }, []);

  const resetStates = useCallback(() => {
    setFilestate(false);
  }, [setFilestate]);

  useEffect(() => {
    fetchData().then((r) => setFetching(false));
  }, [fetchData]);

  useEffect(() => {
    if (
        !data ||
        newFileUploaded) {
      resetStates();
      fetchData();
    }
  }, [data, newFileUploaded, resetStates, fetchData]);



  function renderFileList(){
    if (fetching) {
      return <LoaderCirclePrimary />;
    }
    if (data.length === 0) {
      return (
          <>
            <p>
              You can upload files by clicking on the upload button in the top
              right corner.
            </p>
          </>
      );
    } else {
      return (
          <>
            <Card>
              <ListWrapper>
                {fetching && <LoaderCirclePrimary />}
                <Table columns={columns} data={data} />
              </ListWrapper>
            </Card>
          </>
      );
    }

    return (
        <>

        </>
    )
  }

  return (
      <>
        {renderFileList()}
      </>
  );
}

export default UserFileList;

const ListWrapper = styled.div`
  display: flex;
  justify-content: center;
  min-width: 300px;
  max-height: 500px;
  overflow-y: scroll;
  @media only screen and (max-width: 500px) {
    max-height: 300px;
  }

  .menu-icon {
    margin-left: 8px;
    height: 24px;
    display: inline-block;
  }
`;



