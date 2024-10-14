import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useUser } from "../context/UserContext";
import Modal from "../components/Modal";
import ResumeNotRegistered from "../components/ResumeNotRegistered";
import { useLocation, useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 677px;
  height: auto;
  margin: 40px auto;
`;

const FileContainer = styled.div`
  width: 100%;
  height: 292px;
  margin-bottom: 30px;
  background-color: #ffffff;
  border-radius: 20px;
  border: 1px solid #d9d9d9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
`;

const URLContainer = styled.div`
  width: 100%;
  height: 214px;
  background-color: #ffffff;
  border-radius: 20px;
  border: 1px solid #d9d9d9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px 30px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #313131;
  text-align: left;
`;

const DescriptionText = styled.p`
  font-size: 14px;
  color: #838383;
  margin: 20px 0;
`;

const FileInput = styled.input`
  display: none; /* 기본 파일 입력을 숨김 */
`;

const Label = styled.label`
  width: 135px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;

  padding: 10px;
  background-color: #1e388b;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  text-align: center;

  &:hover {
    background-color: #3f5ba9;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const AddURLPlus = styled.button`
  background-color: transparent;
  border: none;
  font-size: 36px;
  color: #dde2f1;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    color: #3f5ba9;
  }
`;

const InlineContainer = styled.div`
  width: 100%;
  height: 34px;
  display: flex;
  justify-content: center; /* 추가: 중앙 배치 */
  margin-bottom: 10px;
  gap: 10px;
`;

const Input = styled.input`
  width: 476px;
  height: 34px;
  padding: 10px;
  border-radius: 15px;
  border: 1px solid #ccc;
`;

const AddURLButton = styled.button`
  width: 109px;
  height: 34px;
  border-radius: 15px;
  border: 1px solid #ccc;
  background-color: ${(props) =>
    props.$completed ? "#1E388B" : "#ffffff"}; /* 등록 완료 시 색깔 변경 */
  color: ${(props) => (props.$completed ? "#fff" : "#838383")};
  cursor: pointer;
  font-size: 14px;
  text-align: center;

  &:hover {
    background-color: ${(props) =>
      props.$completed ? "#3f5ba9" : "#e9e9e9"}; /* 호버 색깔 변경 */
  }
`;

const ResultMessage = styled.p`
  font-size: 14px;
  color: green;
  text-align: center;
  margin-top: 20px;
`;
const FileList = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 10px; /* 파일들 간의 간격을 추가 */
  flex-wrap: wrap; /* 파일들이 한 줄에 다 들어가지 않을 경우 다음 줄로 넘김 */
`;

const FileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0; /* 테두리 */
  border-radius: 15px;
  font-size: 14px;
  color: #333;
  max-width: 200px; /* 전체 파일 항목의 최대 너비 */
  white-space: nowrap; /* 텍스트가 한 줄로 나오게 */
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FileName = styled.span`
  flex-grow: 1; /* 파일 이름 영역이 가능한 한 많이 차지하도록 함 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const RemoveButton = styled.div`
  flex-shrink: 0; /* 삭제 버튼은 크기가 줄어들지 않도록 설정 */
  width: 24px;
  height: 24px;
  background-color: #d9d9d9;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 12px;
    height: 2px;
    background-color: white;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }

  &:hover {
    background-color: #e9e9e9;
  }
`;

// 버튼들을 나란히 배치하기 위한 컨테이너
const ButtonContainer = styled.div`
  width: 500px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 20px;
  margin-left: auto; /* 추가 */
  margin-right: auto; /* 추가 */
`;

const BackButton = styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  background-color: #f8f9ff;
  color: #313131;
  border: 1px solid #e0e0e0; /* 테두리 */
  cursor: pointer;
  font-size: 24px;
  font-weight: bold;

  &:hover {
    background-color: #e9e9e9;
  }
`;

const RegisterButton = styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  background-color: #1e388b;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 24px;
  font-weight: bold;

  &:hover {
    background-color: #3f5ba9;
  }
`;

function FileUrlRegisterPage() {
  const { user, loading } = useUser(); // 로그인 상태 확인
  const [fileList, setFileList] = useState([]); // 서버에서 가져온 파일 리스트
  const [urls, setUrls] = useState([""]); // URL 입력 필드를 배열로 관리
  const [completedUrls, setCompletedUrls] = useState([false]); // 각 URL의 등록 완료 상태를 배열로 관리
  const [fetchedUrls, setFetchedUrls] = useState([]); // 서버에서 가져온 URL 데이터
  const [loadingUserData, setLoadingUserData] = useState(true); // 유저 data 로딩 상태
  const [loadingUrlsData, setLoadingUrlsData] = useState(true); // URL 로딩 상태
  const [loadingFiles, setLoadingFiles] = useState(true); // 파일 로딩 상태
  const [resultMessage, setResultMessage] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // 현재 위치에서 state를 가져옴

  // 서버에서 유저 정보를 가져옴
  useEffect(() => {
    if (user && user.accessToken) {
      fetch(`${process.env.REACT_APP_API_URL}/api/me`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (
            !data.name ||
            !data.birth ||
            !data.sex ||
            !data.finalEducation ||
            !data.phone
          ) {
            // 모달을 띄움
            setModalOpen(true);
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        })
        .finally(() => {
          setLoadingUserData(false); // URL 로딩 상태 해제
        });
    }
  }, [user]);

  const handleModalClose = () => {
    setModalOpen(false);
    const from = location.state?.from || "/"; // state에서 from을 가져오거나 기본 경로로 설정
    navigate(from); // 모달 닫으면 state에 저장된 주소로 이동
  };

  const MAX_FILE_COUNT = 5;

  // 서버에서 파일 목록 가져오기
  useEffect(() => {
    if (user && user.accessToken) {
      fetch(`${process.env.REACT_APP_API_URL}/api/files?type=resume`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success && data.fileList) {
            const serverFiles = data.fileList.map((file) => ({
              id: file.id, // 파일 삭제 시 필요한 ID
              name: file.url.split("/").pop(),
            }));
            // 중복 데이터 방지를 위해 필터링
            setFileList((prevFileList) => {
              const newFiles = serverFiles.filter(
                (newFile) =>
                  !prevFileList.some((file) => file.name === newFile.name)
              );
              return [...prevFileList, ...newFiles];
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching files:", error);
          setResultMessage("파일 목록을 가져오는 중 오류가 발생했습니다.");
        })
        .finally(() => {
          setLoadingFiles(false);
        });
    }
  }, [user]);

  // 서버에서 URL 목록 가져오기
  useEffect(() => {
    if (user && user.accessToken) {
      fetch(`${process.env.REACT_APP_API_URL}/api/me/urls`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch URLs");
          }
          return response.json();
        })
        .then((data) => {
          if (data.success && data.urlList && data.urlList.length > 0) {
            const fetchedUrlList = data.urlList.map((item) => item.url);
            const fetchedCompletedList = data.urlList.map(() => true);
            setUrls(fetchedUrlList); // 가져온 URL 필드에 넣음
            setCompletedUrls(fetchedCompletedList); // 등록 완료 상태로 표시
            setFetchedUrls(data.urlList); // 전체 URL 데이터 저장 (index 값 포함)
          }
        })
        .catch((error) => {
          console.error("Error fetching URLs:", error);
        })
        .finally(() => {
          setLoadingUrlsData(false); // URL 로딩 상태 해제
        });
    }
  }, [user]);

  // 서버에 URL 추가 요청을 보내는 함수
  const handleUrlSubmit = (index) => {
    const url = urls[index];

    if (url) {
      fetch(`${process.env.REACT_APP_API_URL}/api/me/urls`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`, // 사용자 인증 토큰 추가
        },
        body: JSON.stringify({ url }), // 서버로 전송할 URL
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to add URL");
          }
          return response.json();
        })
        .then((data) => {
          if (data.success) {
            setResultMessage(`URL "${url}"이(가) 성공적으로 등록되었습니다.`);
            const newCompletedUrls = [...completedUrls];
            newCompletedUrls[index] = true; // 등록 완료 상태로 변경
            setCompletedUrls(newCompletedUrls);
          }
        })
        .catch((error) => {
          console.error("Error adding URL:", error);
          setResultMessage("URL 추가 중 오류가 발생했습니다.");
        });
    } else {
      setResultMessage("URL을 입력해 주세요.");
    }
  };

  // 서버에 URL 삭제 요청을 보내는 함수
  const handleUrlDelete = (indexToRemove) => {
    const urlToDelete = fetchedUrls[indexToRemove]; // 삭제할 URL 데이터 가져오기

    fetch(`${process.env.REACT_APP_API_URL}/api/me/urls`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify({ index: urlToDelete.index }), // 서버에 index 전달
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete URL");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          // 성공적으로 삭제되었을 때 UI 업데이트
          setUrls(urls.filter((_, i) => i !== indexToRemove)); // 해당 URL을 목록에서 제거
          setCompletedUrls(completedUrls.filter((_, i) => i !== indexToRemove)); // 등록 완료 상태도 제거
          setFetchedUrls(fetchedUrls.filter((_, i) => i !== indexToRemove)); // 서버에서 가져온 데이터도 제거
          setResultMessage("URL이 성공적으로 삭제되었습니다.");
        }
      })
      .catch((error) => {
        console.error("Error deleting URL:", error);
        setResultMessage("URL 삭제 중 오류가 발생했습니다.");
      });
  };

  // 로딩 중일 때는 아무것도 렌더링하지 않음
  if (loading || loadingUserData || loadingFiles || loadingUrlsData) {
    return null;
  }

  // 서버 파일 삭제 요청
  const handleServerFileRemove = (fileId, indexToRemove) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/files`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify({ id: fileId }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete file");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          // 삭제 성공 시 UI에서 파일 제거
          setFileList((prevFileList) =>
            prevFileList.filter((_, index) => index !== indexToRemove)
          );
          setResultMessage("파일이 성공적으로 삭제되었습니다.");
        }
      })
      .catch((error) => {
        console.error("Error deleting file:", error);
        setResultMessage("파일 삭제 중 오류가 발생했습니다.");
      });
  };

  // 사용자가 선택한 파일 처리
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    // 중복된 파일 필터링
    const filteredFiles = selectedFiles.filter(
      (newFile) =>
        !fileList.some((existingFile) => existingFile.name === newFile.name)
    );

    if (fileList.length + filteredFiles.length > MAX_FILE_COUNT) {
      setResultMessage(`최대 ${MAX_FILE_COUNT}개의 파일만 선택할 수 있습니다.`);
      return;
    }

    setFileList((prevFileList) => [...prevFileList, ...filteredFiles]);
    e.target.value = ""; // 파일 선택 후, value 초기화
  };

  // 파일 목록에서 파일 제거하는 함수
  const handleFileRemove = (indexToRemove) => {
    setFileList((prevFileList) =>
      prevFileList.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();

    const newFiles = fileList.filter((file) => !file.id); // 서버에서 받아온 파일 제외

    if (newFiles.length > 0) {
      try {
        const uploadPromises = newFiles.map((file) => {
          const formData = new FormData();
          formData.append("file", file); // 파일 하나씩 전송
          formData.append("type", "resume");

          return fetch(`${process.env.REACT_APP_API_URL}/api/files/upload`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
            body: formData,
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Failed to upload file");
              }
              return response.json();
            })
            .then((data) => {
              if (!data.success) {
                throw new Error("File upload failed");
              }
            });
        });

        // 모든 파일 업로드가 완료될 때까지 대기
        await Promise.all(uploadPromises);

        // 업로드가 성공적으로 완료되었으면 메시지를 표시하고 새로고침
        setResultMessage("모든 파일이 성공적으로 업로드되었습니다.");
        window.location.reload(); // 새로고침
      } catch (error) {
        console.error("Error uploading files:", error);
        setResultMessage("파일 업로드 중 오류가 발생했습니다.");
      }
    } else {
      setResultMessage("업로드할 파일을 선택해 주세요.");
    }
  };

  const handleUrlChange = (index, value) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const handleAddUrl = () => {
    if (urls.length < 3) {
      setUrls([...urls, ""]);
      setCompletedUrls([...completedUrls, false]); // 새 URL 필드 추가 시 완료 상태 초기화
    } else {
      setResultMessage("최대 3개의 URL만 추가할 수 있습니다.");
    }
  };

  // 뒤로가기 버튼 핸들러
  const handleBack = () => {
    window.history.back(); // 뒤로가기 기능을 실행
  };

  return (
    <>
      <Container>
        {/* File 등록 컨테이너 */}
        <FileContainer>
          <Title>파일 등록</Title>
          <DescriptionText>
            500MB 이하의 jpg, png, pdf, gif 파일 5개까지 업로드 가능합니다.
          </DescriptionText>
          <form>
            <Label htmlFor="file">파일 선택</Label>
            <FileInput
              type="file"
              id="file"
              onChange={handleFileChange}
              multiple // 여러 파일 선택 가능
            />
          </form>

          {/* 파일 목록 */}
          <FileList>
            {fileList.map((file, index) => (
              <FileItem key={index}>
                <FileName>{file.name}</FileName>
                {/* 서버에서 가져온 파일인 경우 삭제할 수 있게 RemoveButton에 id 전달 */}
                <RemoveButton
                  onClick={
                    () =>
                      file.id
                        ? handleServerFileRemove(file.id, index) // 서버 파일 삭제
                        : handleFileRemove(index) // 선택한 파일 삭제
                  }
                />
              </FileItem>
            ))}
          </FileList>
        </FileContainer>

        {/* URL 등록 컨테이너 */}
        <URLContainer>
          <TitleContainer>
            <Title>URL 등록</Title>
            <AddURLPlus onClick={handleAddUrl}>+</AddURLPlus>
          </TitleContainer>

          {/* URL 입력 필드들 */}
          {urls.map((url, index) => (
            <InlineContainer key={index}>
              <Input
                type="text"
                placeholder="URL을 등록해 주세요"
                value={url}
                onChange={(e) => handleUrlChange(index, e.target.value)}
                disabled={completedUrls[index]} // 등록 완료된 URL은 수정 불가
              />
              <AddURLButton
                onClick={
                  () =>
                    completedUrls[index]
                      ? handleUrlDelete(index) // 등록 완료된 URL 삭제
                      : handleUrlSubmit(index) // 새 URL 등록
                }
                $completed={completedUrls[index]}
              >
                {completedUrls[index] ? "등록완료" : "등록하기"}
              </AddURLButton>
            </InlineContainer>
          ))}
        </URLContainer>

        {/* 돌아가기와 등록하기 버튼을 같은 줄에 배치 */}
        <ButtonContainer>
          <BackButton onClick={handleBack}>돌아가기</BackButton>
          <RegisterButton onClick={handleFileSubmit}>등록하기</RegisterButton>
        </ButtonContainer>
        {/* 결과 메시지 */}
        {resultMessage && <ResultMessage>{resultMessage}</ResultMessage>}
      </Container>

      <Modal isOpen={isModalOpen}>
        <ResumeNotRegistered onClose={handleModalClose} />
      </Modal>
    </>
  );
}

export default FileUrlRegisterPage;
